export default function BudgetTracker({
  budget = {}
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        💰 Budget Overview
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">
            Total Budget
          </p>

          <p className="text-2xl font-bold">
            ₹
            {budget.totalBudget || 0}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Total Spent
          </p>

          <p className="text-2xl font-bold text-red-500">
            ₹
            {(budget.flightCost || 0) +
              (budget.hotelCost || 0) +
              (budget.airportTransferCost ||
                0) +
              (budget.localTransportCost ||
                0) +
              (budget.activityCost || 0)}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Remaining
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹
            {budget.remaining || 0}
          </p>
        </div>
      </div>
    </div>
  );
}