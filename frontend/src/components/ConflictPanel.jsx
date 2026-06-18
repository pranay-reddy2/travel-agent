export default function ConflictPanel({
  conflicts
}) {
  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="font-bold mb-3">
        Conflicts
      </h2>

      {conflicts.map(
        (
          conflict,
          index
        ) => (
          <div
            key={index}
            className="bg-red-100 p-3 rounded mb-2"
          >
            <p>
              {
                conflict.issue
              }
            </p>

            <p>
              Severity:
              {
                conflict.severity
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}