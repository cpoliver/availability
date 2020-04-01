import React, { useState, useEffect } from "react";

import "./App.css";
import { SERVER_URL, START_OF_SCHEDULE, END_OF_SCHEDULE } from "./constants";
import { Schedule } from "./components/Schedule";

function App() {
  const [availability, setAvailability] = useState([]);

  const loadAvailability = () =>
    fetch(`${SERVER_URL}/availability`)
      .then(res => res.json())
      .then(setAvailability)
      .catch(console.error);

  useEffect(() => {
    if (!availability.length) loadAvailability();
  });

  if (!availability.length) {
    return "Loading...";
  }

  return (
    <>
      <Schedule
        availability={availability}
        startHour={START_OF_SCHEDULE}
        endHour={END_OF_SCHEDULE}
      />
      <hr />
      <pre>{JSON.stringify(availability, null, 2)}</pre>
    </>
  );
}

export default App;
