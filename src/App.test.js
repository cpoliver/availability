import * as R from "ramda";

import { schedule } from "./data/inputData";
import { transformedSchedule } from "./data/transformedData";
import { isAvailable, getDays, dayFromStartTime, transformDay } from "./utils";

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

describe("officeObject to schedule", () => {
  const { scheduleItems } = schedule.value[0];
  const scheduleItemBusy = scheduleItems[0];
  const scheduleItemTentative = scheduleItems[1];

  describe("dayFromStartTime", () => {
    it("should return the dd/MM/yyy date for a given schedule item", () => {
      const firstDay = dayFromStartTime(R.head(scheduleItems));
      const lastDay = dayFromStartTime(R.last(scheduleItems));

      expect(firstDay).toEqual("30/03/2020");
      expect(lastDay).toEqual("01/05/2020");
    });
  });

  describe.skip("getBusyHours", () => {
    it("should return an array of hourly slots that are busy", () => {
      // filter only busy
      // convert ranges to hour arrays
    });
  });

  describe.skip("getAvailableHours", () => {
    it("should return an array of start/end times for available slots", () => {
      // invert busy to available
      // convert hours to start/end object
    });
  });

  describe.skip("transformSchedule", () => {
    it("should return a list of partially transformed availibility objects", () => {
      const expected = [
        {
          date: "30/03/2020",
          availableSlots: [
            // TBC
          ],
        },
        {
          date: "30/03/2020",
          availableSlots: [
            // TBC
          ],
        },
      ];

      const actual = transformSchedule(schedule);
      expect(actual).toEqual(transformedSchedule);
    });
  });
});
