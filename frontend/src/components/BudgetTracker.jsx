export default function BudgetTracker({
  budget
}) {
  const spent =
    budget.flightCost +
    budget.hotelCost;

  const remaining =
    budget.totalBudget -
    spent;

  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="font-bold">
        Budget Tracker
      </h3>

      <p>
        Budget:
        ₹{budget.totalBudget}
      </p>

      <p>
        Spent:
        ₹{spent}
      </p>

      <p>
        Remaining:
        ₹{remaining}
      </p>
    </div>
  );
}