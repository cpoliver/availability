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

// I've used ramda heavily as I believe it leads to smaller-reusable functions that can be composed
// my demo here might help you understand my rationale: https://codepen.io/cpoliver/pen/OJJywxX?editors=0010
// and slide about Ramda/FP in JS here: https://drive.google.com/file/d/1S2FpcXxthfrPdUf0AHT4q899VeDGDbVC/view?usp=sharing

const toHours = isoDateStr => new Date(isoDateStr).getHours();

const toTimeString = hour => `${hour}:00`;

const isBusy = R.propEq("status", STATUS.BUSY);

// takes a range of hours and returns the inverse: used to flip busy to available
const invertHours = R.flip(R.without)(HOUR_SLOTS);

// used when grouping the scheduleItems by dd/MM/yyyy
export const dayFromScheduleItem = ({ start }) =>
  format("dd/MM/yyyy", new Date(start.dateTime));

// translates an office 365 range to an array of ints representing each hour of the day
export const transformRange = ({ start, end }) =>
  R.range(toHours(start.dateTime), toHours(end.dateTime));

// takes an int array of hours and returns the expected startTime/endTime object from the original API
export const rangeToStartEnd = R.map(hour => ({
  startTime: toTimeString(hour),
  endTime: toTimeString(hour === 23 ? 0 : hour + 1),
}));

export const getAvailableHours = R.pipe(
  // discard non-busy slots
  R.filter(isBusy),
  // transform 365 into int array
  R.chain(transformRange),
  // remove duplicates
  R.uniq,
  // derive availibility from busy
  invertHours,
  // convert int array to output startTime/endTime object
  rangeToStartEnd,
);

export const getDays = R.groupBy(dayFromScheduleItem);

export const transformSchedule = ({ value }) => {
  const { scheduleItems } = R.head(value);

  return R.mapObjIndexed(
    // wrap the transformed data with the 'availableSlots' property
    (available, date) => ({ availableSlots: getAvailableHours(available) }),
    // group the scheduleItems by dd/MM/yyyy key
    getDays(scheduleItems),
  );
};

// helper to get a map of all hour slots
export const allHours = rangeToStartEnd(HOUR_SLOTS);
