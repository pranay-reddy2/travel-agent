export default function TransportCard({
  transport = {}
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">
        🚕 Transport
      </h2>

      <div className="mb-4">
        <p className="font-semibold">
          Airport Transfer
        </p>

        <p>
          {
            transport
              ?.airportTransfer
              ?.name
          }
        </p>

        <p>
          ₹
          {
            transport
              ?.airportTransfer
              ?.estimatedCost || 0
          }
        </p>
      </div>

      <div>
        <p className="font-semibold">
          Local Transport
        </p>

        <p>
          {
            transport
              ?.localTransport
              ?.name
          }
        </p>

        <p>
          ₹
          {
            transport
              ?.localTransport
              ?.estimatedCost || 0
          }
        </p>
      </div>
    </div>
  );
}