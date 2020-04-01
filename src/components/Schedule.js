import { isToday } from "date-fns";
import { addDays, format, startOfWeek, isSameDay } from "date-fns/fp";
import { range, splitAt } from "ramda";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const DAYS_IN_WEEK = 7;

// TODO: move to and pass props from App
const START_OF_SCHEDULE = 8;
const END_OF_SCHEDULE = 20 + 1;

const padTime = str => str.toString().padStart(2, "0");

const getTimezone = () => format("xxxxx", new Date());

export const Schedule = ({
  availability,
  currentDate = new Date(),
  startHour = 8,
  endHour = 20 + 1, // range is up to, but not including
}) => {
  const weekStart = startOfWeek(currentDate);
  const days = range(0, DAYS_IN_WEEK).map(offset => addDays(offset, weekStart));
  const hours = range(START_OF_SCHEDULE, END_OF_SCHEDULE).map(padTime);

  const isDayAvailable = dateToCheck =>
    availability.filter(({ date }) => {
      const formattedDate = format("dd/MM/yyy", dateToCheck);
      return date === formattedDate;
    }).length > 0;

  return (
    <div
      css={css`
        align-items: center;
        color: #41484f;
        display: flex;
        flex-direction: column;
        font-size: 1.6rem;
        font-weight: 500;
      `}
    >
      <div
        css={css`
          margin: 24px;
          font-weight: 600;
        `}
      >
        Your timezone: GMT {getTimezone()}
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        {days.map((d, i) => (
          <Day key={i} date={d} hasAvailability={isDayAvailable(d)} />
        ))}
      </div>
      <div
        css={css`
          display: flex;
          margin-top: 16px;
        `}
      >
        {hours.map(h => (
          <Time key={h} hour={h} />
        ))}
      </div>
    </div>
  );
};

const Day = ({ date, hasAvailability = false }) => {
  const [day, ordinal] = splitAt(-2, format("do", date));

  return (
    <div
      css={css`
        align-items: center;
        background: ${hasAvailability ? "#e5e5e5" : "#f8f9fa"};
        border-radius: 8px;
        border: 3px solid ${isToday(date) ? "#5a5dea" : "transparent"};
        color: ${isToday(date) ? "#5a5dea" : ""};
        cursor: ${hasAvailability ? "pointer" : "initial"};
        display: flex;
        flex-direction: column;
        font-weight: 700;
        margin: 4px;
        padding: 12px;
        width: 120px;
      `}
    >
      <div
        css={css`
          padding: 4px;
        `}
      >
        {day}
        <small
          css={css`
            font-size: 1rem;
            font-weight: 600;
          `}
        >
          {ordinal}
        </small>
      </div>
      <div
        css={css`
          padding: 4px;
        `}
      >
        {format("E", date)}
      </div>
    </div>
  );
};

const Time = ({ hour }) => (
  <div
    css={css`
      border-radius: 8px;
      border: 2px solid black;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 8px;
      padding: 8px 16px;
    `}
  >
    {hour}:00
  </div>
);
