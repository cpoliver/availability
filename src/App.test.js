import * as R from "ramda";

import { schedule } from "./data/inputData";
import { transformedSchedule } from "./data/transformedData";
import {
  isAvailable,
  getDays,
  getBusyHours,
  dayFromScheduleItem,
  transformDay,
  transformRange,
} from "./utils";

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

  const days = R.groupBy(dayFromScheduleItem, scheduleItems);

  describe("dayFromScheduleItem", () => {
    it("should return the dd/MM/yyy date for a given schedule item", () => {
      const first = dayFromScheduleItem(R.head(scheduleItems));
      const last = dayFromScheduleItem(R.last(scheduleItems));

      expect(first).toEqual("30/03/2020");
      expect(last).toEqual("01/05/2020");
    });
  });

  describe("transformRange", () => {
    it("should take a start and end time and return an array of hourly slots", () => {
      const actual1 = transformRange({
        start: { dateTime: "2020-04-02T09:00:00.0000000" },
        end: { dateTime: "2020-04-02T10:00:00.0000000" },
      });

      const actual2 = transformRange({
        start: { dateTime: "2020-04-02T00:00:00.0000000" },
        end: { dateTime: "2020-04-02T13:00:00.0000000" },
      });

      const actual3 = transformRange({
        start: { dateTime: "2020-04-12T01:00:00.0000000" },
        end: { dateTime: "2020-04-12T04:00:00.0000000" },
      });

      expect(actual1).toEqual([9]);
      expect(actual2).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      expect(actual3).toEqual([1, 2, 3]);
    });
  });

  describe.skip("getBusyHours", () => {
    it("should return an array of hourly slots that are busy", () => {
      const actual1 = getBusyHours(days[0]);
      const expected1 = [11, 12];
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
