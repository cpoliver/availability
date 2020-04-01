/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { format } from "date-fns/fp";
import { splitAt } from "ramda";

export const Day = ({ date, isSelected = false, hasAvailability = false }) => {
  const [day, ordinal] = splitAt(-2, format("do", date));

  return (
    <div
      css={css`
        align-items: center;
        background: ${hasAvailability ? "#e5e5e5" : "#f8f9fa"};
        border-radius: 8px;
        border: 3px solid ${isSelected ? "#5a5dea" : "transparent"};
        color: ${isSelected ? "#5a5dea" : ""};
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
