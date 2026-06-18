export default function RestaurantCard({
  restaurant = {}
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-3">
        🍽 Restaurant
      </h2>

      <p className="font-medium">
        {restaurant.name || "Not Available"}
      </p>

      <p className="text-gray-600 mt-2">
        Estimated Cost
      </p>

      <p className="text-2xl font-bold text-orange-600">
        ₹
        {restaurant.estimatedCost || 0}
      </p>
    </div>
  );
}