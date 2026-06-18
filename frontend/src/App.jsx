import { useState } from "react";

import TravelForm from "./components/TravelForm";
import BudgetTracker from "./components/BudgetTracker";
import FlightCard from "./components/FlightCard";
import HotelCard from "./components/HotelCard";
import Timeline from "./components/Timeline";
import ConflictPanel from "./components/ConflictPanel";
import ChangeChat from "./components/ChangeChat";
import AgentFlow from "./components/AgentFlow";

import { generatePlan }
from "./services/api";

export default function App() {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleGenerate =
    async (brief) => {
      setLoading(true);

      const result =
        await generatePlan(
          brief
        );

      setData(result);

      setLoading(false);
    };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Agentic Travel Planner
        </h1>

        <TravelForm
          onSubmit={
            handleGenerate
          }
        />

        {loading && (
          <div className="mt-4">
            Searching Flights...
            Searching Hotels...
            Building Itinerary...
          </div>
        )}

        {data && (
          <div className="space-y-6 mt-6">

            <BudgetTracker
              budget={
                data
                  .finalItinerary
                  .budget
              }
            />

            <div className="grid md:grid-cols-2 gap-4">

              <FlightCard
                flight={
                  data
                    .finalItinerary
                    .selectedFlight
                }
              />

              <HotelCard
                hotel={
                  data
                    .finalItinerary
                    .selectedHotel
                }
              />
            </div>

            <Timeline
              days={
                data
                  .finalItinerary
                  .days
              }
            />

            <ConflictPanel
              conflicts={
                data.conflicts
              }
            />

            <AgentFlow />

            <ChangeChat
              itinerary={
                data
                  .finalItinerary
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}