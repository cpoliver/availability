import React from "react";
import { addDays, format } from "date-fns/fp";
import { flip, range, pipe } from "ramda";

const DAYS_IN_WEEK = 7;
const MINUTES_IN_HOUR = 60;

// TODO: move to and pass props from App
const START_OF_SCHEDULE = 8;
const END_OF_SCHEDULE = 20 + 1;

const padTime = str => str.toString().padStart(2, "0");

const getTimezone = () => {
  const gmtOffsetHours = -5 || new Date().getTimezoneOffset() / MINUTES_IN_HOUR;
  const [hours, partHours = 0] = gmtOffsetHours.toString().split(".");
  const sign = hours < 0 ? "-" : "+";

  return `${sign}${padTime(Math.abs(hours))}:${partHours ? "30" : "00"}`;
};

export const Schedule = ({
  currentDate,
  startHour = 8,
  endHour = 20 + 1, // range is up to, but not including
}) => {
  const days = range(0, DAYS_IN_WEEK).map(flip(addDays));
  const hours = range(START_OF_SCHEDULE, END_OF_SCHEDULE).map(padTime);

  return (
    <div>
      <div>Your timezone: GMT {getTimezone()}</div>
      <div>
        {days.map((d, i) => (
          <Day key={i} date={d} />
        ))}
      </div>
      <div>
        {hours.map(h => (
          <Time key={h} hour={h} />
        ))}
      </div>
    </div>
  );
};

const Day = ({ date }) => (
  <div>
    <div>{format("do", date)}</div>
    <div>{format("E", date)}</div>
  </div>
);

const Time = ({ hour }) => <div>{hour}:00</div>;
