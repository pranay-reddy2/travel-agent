import express from "express";

import { parseTravelBrief } from "../agents/intentAgent.js";
import { searchFlights } from "../agents/flightAgent.js";
import { searchHotels } from "../agents/hotelAgent.js";
import { searchActivities } from "../agents/activityAgent.js";
import { searchRestaurants } from "../agents/restaurantAgent.js";
import { searchTransport } from "../agents/transportAgent.js";

import { buildItinerary } from "../agents/itineraryAgent.js";

import {
  detectConflicts,
  resolveConflicts
} from "../agents/conflictAgent.js";

import {
  processChangeRequest
} from "../agents/changeAgent.js";

const router = express.Router();

/*
POST /api/travel/plan
*/

router.post(
  "/plan",
  async (req, res) => {
    try {
      const { brief } = req.body;

      if (!brief) {
        return res.status(400).json({
          success: false,
          message:
            "Travel brief required"
        });
      }

      /*
      STEP 1
      Extract requirements
      */

      const parsedBrief =
        await parseTravelBrief(
          brief
        );

      /*
      STEP 2
      Parallel searches
      */

      const [
        flights,
        hotels,
        activities,
        restaurants,
        transport
      ] = await Promise.all([
        searchFlights(
          parsedBrief
        ),
        searchHotels(
          parsedBrief
        ),
        searchActivities(
          parsedBrief
        ),
        searchRestaurants(
          parsedBrief
        ),
        searchTransport(
          parsedBrief
        )
      ]);

      /*
      STEP 3
      Build itinerary
      */

      const itinerary =
        await buildItinerary({
          trip: parsedBrief,
          flights,
          hotels,
          activities,
          restaurants,
          transport
        });

      /*
      STEP 4
      Detect conflicts
      */

      const conflicts =
        detectConflicts(
          itinerary
        );

      /*
      STEP 5
      Auto resolve
      */

      const resolved =
        resolveConflicts(
          itinerary,
          conflicts
        );

      return res.json({
        success: true,

        tripDetails:
          parsedBrief,

        options: {
          flights,
          hotels,
          activities,
          restaurants,
          transport
        },

        conflicts,

        finalItinerary:
          resolved
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to create itinerary",
        error:
          error.message
      });
    }
  }
);

/*
POST /api/travel/change
*/

router.post(
  "/change",
  async (req, res) => {
    try {
      const {
        itinerary,
        request
      } = req.body;

      const response =
        await processChangeRequest(
          itinerary,
          request
        );

      return res.json({
        success: true,
        ...response
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        error:
          error.message
      });
    }
  }
);

/*
GET /api/travel/demo
*/

router.get(
  "/demo",
  async (req, res) => {
    try {
      const sampleBrief = `
Plan a trip from Bangalore to Tokyo.

Dates:
10 July 2026 - 15 July 2026

Travellers:
2 Adults

Budget:
150000 INR

Hotel:
4 Star

Requirements:
Vegetarian food nearby
Near metro station
`;

      const parsedBrief =
        await parseTravelBrief(
          sampleBrief
        );

      const [
        flights,
        hotels,
        activities,
        restaurants,
        transport
      ] = await Promise.all([
        searchFlights(
          parsedBrief
        ),
        searchHotels(
          parsedBrief
        ),
        searchActivities(
          parsedBrief
        ),
        searchRestaurants(
          parsedBrief
        ),
        searchTransport(
          parsedBrief
        )
      ]);

      const itinerary =
        await buildItinerary({
          trip: parsedBrief,
          flights,
          hotels,
          activities,
          restaurants,
          transport
        });

      const conflicts =
        detectConflicts(
          itinerary
        );

      const resolved =
        resolveConflicts(
          itinerary,
          conflicts
        );

      return res.json({
        success: true,
        tripDetails:
          parsedBrief,
        options: {
          flights,
          hotels,
          activities,
          restaurants,
          transport
        },
        conflicts,
        finalItinerary:
          resolved
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error:
          error.message
      });
    }
  }
);

export default router;