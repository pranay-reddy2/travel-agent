export default function Timeline({
  days
}) {
  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Timeline
      </h2>

      {days.map((day) => (
        <div
          key={day.day}
          className="mb-6"
        >
          <h3 className="font-bold">
            Day {day.day}
          </h3>

          {day.events.map(
            (
              event,
              index
            ) => (
              <div
                key={index}
                className="border-l-2 pl-4 my-2"
              >
                <p>
                  {event.time}
                </p>

                <p>
                  {
                    event.title
                  }
                </p>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}