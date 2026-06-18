import { useState } from "react";

import TravelForm from "./components/TravelForm";
import TripSummary from "./components/TripSummary";
import BudgetTracker from "./components/BudgetTracker";
import FlightCard from "./components/FlightCard";
import HotelCard from "./components/HotelCard";
import TransportCard from "./components/TransportCard";
import RestaurantCard from "./components/RestaurantCard";
import Timeline from "./components/Timeline";
import ConflictPanel from "./components/ConflictPanel";
import AgentFlow from "./components/AgentFlow";
import ChangeChat from "./components/ChangeChat";

import { generatePlan } from "./services/api";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (brief) => {
    try {
      setLoading(true);

      const result = await generatePlan(brief);

      console.log("API RESULT:", result);

      setData(result);
    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-center mb-2">
            🌍 Agentic Travel Planner
          </h1>

          <p className="text-center text-gray-600">
            AI Powered Travel Planning System
          </p>
        </div>

        <TravelForm onSubmit={handleGenerate} />

        {loading && (
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <div className="animate-pulse space-y-2">
              <p>🧠 Intent Agent analysing trip...</p>
              <p>✈ Flight Agent searching flights...</p>
              <p>🏨 Hotel Agent finding stays...</p>
              <p>🍽 Restaurant Agent selecting restaurants...</p>
              <p>🚕 Transport Agent planning transport...</p>
              <p>📅 Itinerary Agent building schedule...</p>
            </div>
          </div>
        )}

        {data?.finalItinerary && (
          <div className="space-y-6 mt-8">

            <TripSummary
              trip={data.tripDetails || {}}
            />

            <BudgetTracker
              budget={data.finalItinerary.budget || {}}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              <FlightCard
                flight={data.finalItinerary.selectedFlight || {}}
              />

              <HotelCard
                hotel={data.finalItinerary.selectedHotel || {}}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <TransportCard
                transport={data.finalItinerary.selectedTransport || {}}
              />

              <RestaurantCard
                restaurant={
                  data.finalItinerary.selectedRestaurant || {}
                }
              />
            </div>

            <Timeline
              days={data.finalItinerary.days || []}
            />

            <ConflictPanel
              conflicts={data.conflicts || []}
              resolutions={
                data.finalItinerary.resolutions || []
              }
            />

            <AgentFlow />

            <ChangeChat
              itinerary={data.finalItinerary}
            />

          </div>
        )}

      </div>
    </div>
  );
} 