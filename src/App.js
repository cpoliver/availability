import React, { useState, useEffect } from "react";

import "./App.css";
import { Schedule } from "./components/Schedule";

const SERVER_URL = "http://localhost:8080";

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
      <Schedule availability={availability} />
      <hr />
      <pre>{JSON.stringify(availability, null, 2)}</pre>
    </>
  );
}

export default App;
