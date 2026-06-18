export default function ConflictPanel({
  conflicts,
  resolutions = []
}) {
  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="font-bold text-lg mb-4">
        ⚠ Conflict Resolution
      </h2>

      {conflicts.map(
        (conflict, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 bg-red-50"
          >
            <p>
              <strong>
                Issue:
              </strong>{" "}
              {conflict.issue}
            </p>

            <p>
              <strong>
                Severity:
              </strong>{" "}
              {
                conflict.severity
              }
            </p>
          </div>
        )
      )}

      {resolutions.map(
        (
          resolution,
          index
        ) => (
          <div
            key={index}
            className="border rounded p-3 bg-green-50"
          >
            <p>
              <strong>
                Fix:
              </strong>{" "}
              {
                resolution.action
              }
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {
                resolution.status
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}