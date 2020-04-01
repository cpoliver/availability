/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { addDays, format, startOfWeek, isSameDay } from "date-fns/fp";
import { range, toString } from "ramda";

import { Day } from "./Day";
import { Time } from "./Time";
import { isAvailable } from "../utils";
import { DAYS_IN_WEEK } from "../constants";

const getTimezone = () => format("xxxxx", new Date());

export const Schedule = ({
  availability,
  startHour,
  endHour,
  currentDate = new Date(),
}) => {
  const weekStart = startOfWeek(currentDate);
  const days = range(0, DAYS_IN_WEEK).map(offset => addDays(offset, weekStart));
  const hours = range(startHour, endHour + 1).map(toString);

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const isDayAvailable = dateToCheck =>
    availability.filter(({ date }) => date === format("dd/MM/yyy", dateToCheck))
      .length > 0;

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
          <div key={i} onClick={() => isDayAvailable(d) && setSelectedDate(d)}>
            <Day
              date={d}
              hasAvailability={isDayAvailable(d)}
              isSelected={isSameDay(d, selectedDate)}
            />
          </div>
        ))}
      </div>
      <div
        css={css`
          display: flex;
          margin-top: 16px;
        `}
      >
        {hours.map(
          h =>
            isAvailable(availability)({
              date: selectedDate,
              time: `${h}:00`,
            }) && <Time key={h} hour={h} />,
        )}
      </div>
    </div>
  );
};
