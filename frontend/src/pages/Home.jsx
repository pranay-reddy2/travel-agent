import { useState } from "react";

import TravelForm from "../components/TravelForm";
import Dashboard from "../components/Dashboard";
import ChatBox from "../components/ChatChange";

import { createPlan }
from "../services/api";

export default function Home() {
  const [data, setData] =
    useState(null);

  const handleSubmit =
    async (brief) => {
      const res =
        await createPlan(brief);

      setData(res);
    };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Agentic Travel Planner
      </h1>

      <TravelForm
        onSubmit={handleSubmit}
      />

      <ChatBox />

      <Dashboard
        data={data}
      />
    </div>
  );
}