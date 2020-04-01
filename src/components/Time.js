/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const Time = ({ hour }) => (
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
