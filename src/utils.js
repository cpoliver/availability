import * as R from "ramda";
import { format } from "date-fns/fp";

import { HOURS_IN_DAY, STATUS } from "./constants";

const HOUR_SLOTS = R.range(0, HOURS_IN_DAY);

// client-side

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

// server-side

const toHours = isoDateStr => new Date(isoDateStr).getHours();
const toTimeString = hour => `${hour}:00`;
const isBusy = R.propEq("status", STATUS.BUSY);
const invertHours = R.flip(R.without)(HOUR_SLOTS);

export const dayFromScheduleItem = ({ start }) =>
  format("dd/MM/yyyy", new Date(start.dateTime));

export const transformRange = ({ start, end }) =>
  R.range(toHours(start.dateTime), toHours(end.dateTime));

export const rangeToStartEnd = R.map(hour => ({
  startTime: toTimeString(hour),
  endTime: toTimeString(hour === 23 ? 0 : hour + 1),
}));

export const getAvailableHours = R.pipe(
  R.filter(isBusy),
  R.chain(transformRange),
  R.uniq,
  invertHours,
  rangeToStartEnd,
);

export const getDays = scheduleItems => ({});

export const transformDay = scheduleItems => ({});

export const transformSchedule = schedule => schedule;
