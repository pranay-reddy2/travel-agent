export default function FlightCard({
  flight
}) {
  return (
    <div className="border p-4 rounded">

      <h3 className="font-bold">
        ✈ {flight.airline}
      </h3>

      <p>
        {flight.departure}
        {" → "}
        {flight.arrival}
      </p>

      <p>
        ₹{flight.price}
      </p>

      <p>
        Booking:
        {flight.bookingId}
      </p>
    </div>
  );
}