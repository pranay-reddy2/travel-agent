function timeToMinutes(
  timeString
) {
  const [hours, minutes] =
    timeString
      .split(":")
      .map(Number);

  return (
    hours * 60 + minutes
  );
}

export const detectConflicts = (
  itinerary
) => {
  const conflicts = [];

  const arrival =
    itinerary.selectedFlight
      .arrival;

  const checkIn =
    itinerary.days[0]
      .events[2].time;

  if (
    timeToMinutes(arrival) >
    timeToMinutes(checkIn)
  ) {
    conflicts.push({
      type:
        "Hotel Check-In Conflict",

      issue:
        "Hotel check-in occurs before flight arrival",

      arrival,

      checkIn,

      severity: "medium"
    });
  }

  return conflicts;
};

export const resolveConflicts =
  (
    itinerary,
    conflicts
  ) => {
    const updated =
      structuredClone(
        itinerary
      );

    const resolutions = [];

    conflicts.forEach(
      (conflict) => {
        if (
          conflict.type ===
          "Hotel Check-In Conflict"
        ) {
          updated.days[0]
            .events[2].time =
            "19:00";

          resolutions.push({
            issue:
              conflict.issue,

            action:
              "Moved hotel check-in to 19:00",

            status:
              "Resolved"
          });
        }
      }
    );

    updated.resolutions =
      resolutions;

    return updated;
  };