# Step 1

Using React display at /availability the availability availability returned by the API /availability (you can start the server with `node server`)

## API Spec:

GET `/availability`

**Response structure:**

An example:

```[
{ "date": "15/10/2019",
  "availableSlots": [
         { "startTime": "9:00", "endTime": "10:00" },
         { "startTime": "10:00", "endTime": "11:00" },
   ]
},
{ "date": "16/10/2019",
  "availableSlots": [
         { "startTime": "15:00", "endTime": "16:00" },
         { "startTime": "16:00", "endTime": "17:00" },
   ]
},
]
```

## UI Spec:

The UI should look like the one in Availability availability.png (given the time limits don't worry too much about small details)

## Scenarios

- When the /availability page is loaded the days of the current week should be displayed (no need to display the arrows for scrolling between day) and the days returned from the availability API should be highlighted (in the image with a darker gray)
- When the user select a day in the availability the available times returned from the API (availableSlots) should be displayed

# Step 2

In `server/index.js insteaf of using the method generateMockUpResponse use the menthod generateOffice365Schedule passing this week start and end date and tranform the response in the format described above.

**Business rules:**

- The data used follow this structure https://docs.microsoft.com/en-us/graph/outlook-get-free-busy-schedule
- All dates and times returned by the /availability API should be in UTC
- All the available slots have to start at the beginning of the hour and end in 60 minutes

**Suggestions**

- do small steps and try to think in terms of small incremental scenarios
- commit often and if you want keep track of your decisions in a separate file called decisions.md so it's easier for us to understand why you made some technical decisions. Don't write too much into it just a few pointers while you build the app
- see what you can do in max 3 hours, we are not expecting you too finish the assignment in 3 hours
