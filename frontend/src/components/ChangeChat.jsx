import { useState } from "react";

import { requestChange }
from "../services/api";

export default function ChangeChat({
  itinerary
}) {
  const [message, setMessage] =
    useState("");

  const [response, setResponse] =
    useState(null);

  const submit =
    async () => {
      const data =
        await requestChange(
          itinerary,
          message
        );

      setResponse(data);
    };

  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="font-bold">
        Change Request
      </h2>

      <input
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        placeholder="Flight cancelled"
        className="border p-2 w-full mt-2"
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
      >
        Send
      </button>

      {response && (
        <pre className="mt-4">
          {JSON.stringify(
            response,
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
}