import React from "react";
import { addDays, format } from "date-fns/fp";
import { flip, range } from "ramda";

const DAYS_IN_WEEK = 7;

// TODO: move to and pass props from App
const START_OF_SCHEDULE = 8;
const END_OF_SCHEDULE = 20 + 1;

const formatHour = str => str.toString().padStart(2, "0");

export const Schedule = ({
  currentDate,
  startHour = 8,
  endHour = 20 + 1, // range is up to, but not including
}) => {
  const days = range(0, DAYS_IN_WEEK).map(flip(addDays));
  const hours = range(START_OF_SCHEDULE, END_OF_SCHEDULE).map(formatHour);

  return (
    <div>
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
