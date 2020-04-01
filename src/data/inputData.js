export const schedule = {
  "@odata.context":
    "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.scheduleInformation)",
  value: [
    {
      scheduleId: "AlexW@contoso.OnMicrosoft.com",
      availabilityView:
        "110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010110000000000000000000010",
      scheduleItems: [
        {
          status: "Busy",
          start: {
            dateTime: "2020-03-30T11:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2020-03-30T13:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
        },
        {
          status: "Tentative",
          start: {
            dateTime: "2020-03-31T09:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2020-03-31T10:30:00.0000000",
            timeZone: "Pacific Standard Time",
          },
        },
        {
          status: "Busy",
          start: {
            dateTime: "2020-03-31T11:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2020-03-31T13:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
        },
        {
          status: "Tentative",
          start: {
            dateTime: "2020-04-01T09:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2020-04-01T10:30:00.0000000",
            timeZone: "Pacific Standard Time",
          },
        },
        {
          status: "Busy",
          start: {
            dateTime: "2020-04-01T11:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2020-04-01T13:00:00.0000000",
            timeZone: "Pacific Standard Time",
          },
        },
      ],
      workingHours: {
        daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        startTime: "08:00:00.0000000",
        endTime: "17:00:00.0000000",
        timeZone: {
          "@odata.type": "#microsoft.graph.customTimeZone",
          bias: 480,
          name: "Customized Time Zone",
          standardOffset: {
            time: "02:00:00.0000000",
            dayOccurrence: 1,
            dayOfWeek: "sunday",
            month: 11,
            year: 0,
          },
          daylightOffset: {
            daylightBias: -60,
            time: "02:00:00.0000000",
            dayOccurrence: 2,
            dayOfWeek: "sunday",
            month: 3,
            year: 0,
          },
        },
      },
    },
  ],
};
