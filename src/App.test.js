import { isAvailable } from "./utils";

describe("isAvailable", () => {
  const available = [
    {
      date: "26/03/2020",
      availableSlots: [
        {
          startTime: "9:00",
          endTime: "10:00",
        },
        {
          startTime: "10:00",
          endTime: "11:00",
        },
      ],
    },
    {
      date: "27/03/2020",
      availableSlots: [
        {
          startTime: "15:00",
          endTime: "16:00",
        },
        {
          startTime: "16:00",
          endTime: "17:00",
        },
      ],
    },
  ];

  it("returns true, when the timeslot is available", () => {
    const fn = isAvailable(available);
    const input = [
      { date: new Date(2020, 2, 26), time: "9:00" },
      // { date: new Date(2020, 2, 26), time: "09:00" },
      { date: new Date(2020, 2, 26), time: "10:00" },
      { date: new Date(2020, 2, 27), time: "15:00" },
      { date: new Date(2020, 2, 27), time: "16:00" },
    ];

    input.forEach(i => expect(fn(i)).toBe(true));
  });

  it("returns false, when the timeslot is unavailable", () => {
    const fn = isAvailable(available);
    const input = [
      { date: new Date(2020, 2, 26), time: "11:00" },
      { date: new Date(2020, 2, 26), time: "18:00" },
      { date: new Date(2020, 2, 21), time: "10:00" },
    ];

    input.forEach(i => expect(fn(i)).toBe(false));
  });
});
