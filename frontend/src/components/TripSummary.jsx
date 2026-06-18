export default function TripSummary({
  trip = {}
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        🌍 Trip Summary
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-500">
            Route
          </p>

          <p className="font-semibold">
            {trip.origin} →{" "}
            {trip.destination}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Dates
          </p>

          <p className="font-semibold">
            {trip.startDate}
          </p>

          <p className="font-semibold">
            {trip.endDate}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Travellers
          </p>

          <p className="font-semibold">
            {trip.travellers}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Budget
          </p>

          <p className="font-semibold">
            ₹{trip.budget}
          </p>
        </div>
      </div>
    </div>
  );
}