export default function Dashboard({
  data
}) {
  if (!data) return null;

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold">
        Flights
      </h2>

      <pre>
        {JSON.stringify(
          data.flights,
          null,
          2
        )}
      </pre>

      <h2 className="text-xl font-bold">
        Hotels
      </h2>

      <pre>
        {JSON.stringify(
          data.hotels,
          null,
          2
        )}
      </pre>

      <h2 className="text-xl font-bold">
        Conflicts
      </h2>

      <pre>
        {JSON.stringify(
          data.conflicts,
          null,
          2
        )}
      </pre>

      <h2 className="text-xl font-bold">
        Itinerary
      </h2>

      <div className="whitespace-pre-wrap">
        {data.itinerary}
      </div>
    </div>
  );
}