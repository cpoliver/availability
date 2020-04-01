import * as R from "ramda";
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

export const getDays = scheduleItems => ({});

export const dayFromScheduleItem = ({ start }) =>
  format("dd/MM/yyyy", new Date(start.dateTime));

export const transformDay = scheduleItems => ({});

const toHours = isoDateStr => new Date(isoDateStr).getHours();

export const transformRange = ({ start, end }) => {
  const from = toHours(start.dateTime);
  const to = toHours(end.dateTime);

  return R.range(from, to);
};

export const transformSchedule = schedule => schedule;

export const getBusyHours = scheduleItems => scheduleItems;
