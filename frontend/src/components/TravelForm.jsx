import { useState } from "react";

export default function TravelForm({
  onSubmit
}) {
  const [brief, setBrief] =
    useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Travel Brief
      </h2>

      <textarea
        rows={10}
        value={brief}
        onChange={(e) =>
          setBrief(
            e.target.value
          )
        }
        className="border w-full p-3 rounded"
        placeholder="Plan a trip from Bangalore to Tokyo..."
      />

      <button
        onClick={() =>
          onSubmit(brief)
        }
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
      >
        Generate Plan
      </button>
    </div>
  );
}