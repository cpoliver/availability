import { format } from "date-fns/fp";

export const isAvailable = availability => ({ date, time }) => {
  const dateKey = format("dd/MM/yyyy", date);

  return (
    availability.filter(
      ({ date, availableSlots }) =>
        date === dateKey &&
        availableSlots.filter(({ startTime }) => startTime === time).length > 0,
    ).length > 0
  );
};
