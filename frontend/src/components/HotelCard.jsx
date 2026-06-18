export default function HotelCard({ hotel = {} }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-3">
        🏨 Hotel
      </h2>

      <p className="font-medium">
        {hotel.name || "Not Available"}
      </p>

      <p className="text-gray-600 mt-2">
        Estimated Cost
      </p>

      <p className="text-2xl font-bold text-green-600">
        ₹{hotel.estimatedCost || 0}
      </p>
    </div>
  );
}