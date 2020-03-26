var {
  isSameDayMonthYear,
  durationInDays,
  durationInHours,
  formatDateToYearMonthDay,
  fromISOString
} = require("./dateHelper");

var r = require("ramda");

const workingStartTime = "08:00:00.0000000";
const workingEndTime = "17:00:00.0000000";

const workingDays = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday"
};

const firstDayEventStart = "09:00:00.0000000";
const firstDayEventEnd = "10:30:00.0000000";
const secondDayEventStart = "11:00:00.0000000";
const secondDayEventEnd = "13:00:00.0000000";

const generateEventForDateStringsAndStatus = (
  startDateString,
  endDateString,
  status
) => ({
  status,
  start: {
    dateTime: startDateString,
    timeZone: "Pacific Standard Time"
  },
  end: {
    dateTime: endDateString,
    timeZone: "Pacific Standard Time"
  }
});

const generateEventsForDateString = dateString => [
  generateEventForDateStringsAndStatus(
    dateString + "T" + firstDayEventStart,
    dateString + "T" + firstDayEventEnd,
    "Tentative"
  ),
  generateEventForDateStringsAndStatus(
    dateString + "T" + secondDayEventStart,
    dateString + "T" + secondDayEventEnd,
    "Busy"
  )
];

const generateEvents = (startDate, endDate) => {
  const days = durationInDays(startDate, endDate);
  const daysVector = r.range(0, days + 1);

  const allEvents = r.reduce(
    (acc, day) =>
      r.concat(
        acc,
        generateEventsForDateString(
          formatDateToYearMonthDay(startDate.plus({ days: day }))
        )
      ),
    [],
    daysVector
  );

  return r.filter(event => {
    const eventStartDate = fromISOString(event.start.dateTime);
    const eventEndDate = fromISOString(event.end.dateTime);

    return startDate < eventEndDate && endDate >= eventStartDate;
  }, allEvents);
};

const generateAvailabilityView = (startDate, endDate, events) => {
  const hours = r.range(0, durationInHours(startDate, endDate));

  return r.join(
    "",
    r.map(hour => {
      const date = startDate.plus({ hours: hour });

      const collision = r.find(event => {
        const eventStartDate = fromISOString(event.start.dateTime);
        const eventEndDate = fromISOString(event.end.dateTime);

        return date >= eventStartDate && date < eventEndDate;
      }, events);

      return collision ? 1 : 0;
    }, hours)
  );
};

exports.generateOffice365Schedule = (startDate, endDate) => {
  const events = generateEvents(startDate, endDate);
  const availabilityView = generateAvailabilityView(startDate, endDate, events);

  return {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.scheduleInformation)",
    value: [
      {
        scheduleId: "AlexW@contoso.OnMicrosoft.com",
        availabilityView: availabilityView,
        scheduleItems: events,
        workingHours: {
          daysOfWeek: r.values(workingDays),
          startTime: workingStartTime,
          endTime: workingEndTime,
          timeZone: {
            "@odata.type": "#microsoft.graph.customTimeZone",
            bias: 480,
            name: "Customized Time Zone",
            standardOffset: {
              time: "02:00:00.0000000",
              dayOccurrence: 1,
              dayOfWeek: "sunday",
              month: 11,
              year: 0
            },
            daylightOffset: {
              daylightBias: -60,
              time: "02:00:00.0000000",
              dayOccurrence: 2,
              dayOfWeek: "sunday",
              month: 3,
              year: 0
            }
          }
        }
      }
    ]
  };
};
