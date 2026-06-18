export default function HotelCard({
  hotel
}) {
  return (
    <div className="border p-4 rounded">

      <h3 className="font-bold">
        🏨 {hotel.name}
      </h3>

      <p>
        ⭐ {hotel.rating}
      </p>

      <p>
        ₹
        {hotel.pricePerNight}
        /night
      </p>

      <p>
        Booking:
        {hotel.bookingId}
      </p>
    </div>
  );
}