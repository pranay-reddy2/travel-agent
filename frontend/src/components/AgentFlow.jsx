export default function AgentFlow() {
  const agents = [
    "Intent Agent",
    "Flight Agent",
    "Hotel Agent",
    "Restaurant Agent",
    "Transport Agent",
    "Itinerary Agent",
    "Conflict Agent",
    "Change Agent"
  ];

  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="font-bold mb-4">
        Agent Workflow
      </h2>

      {agents.map(
        (
          agent,
          index
        ) => (
          <div
            key={index}
          >
            {agent}

            {index !==
              agents.length -
                1 &&
              " ↓"}
          </div>
        )
      )}
    </div>
  );
}