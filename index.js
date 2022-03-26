const { google: { calendar } } = require('googleapis');
const auth = require('./auth');
const Calendar = require('./lib/calendar');

const {
    getISOString,
    getEventsForRange,
    getUpcomingEvents,
    insertEvent,
    deleteEventById,
} = new Calendar({
    auth,
    calendar: calendar({ version: "v3" }),
    // value from calendar settings > Integrate calendar > Calendar ID
    calendarId: process.env.CALENDAR_ID
})

const TIME_ZONE = 'America/Los_Angeles'

// Event for Google Calendar
let mockEvent = {
    summary: `This is the summary.`,
    description: `This is the description.`,
    start: {
        dateTime: getISOString({ hourOffset: .5 }),
        timeZone: TIME_ZONE
    },
    end: {
        dateTime: getISOString({ hourOffset: 1 }),
        timeZone: TIME_ZONE
    }
};

getUpcomingEvents({ maxResults: 20 })
    .then(events => {
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.forEach((event, i) => {
                const start = new Date(event.start.dateTime || event.start.date);
                console.log(` ${start.toLocaleDateString()} - ${start.toLocaleTimeString()} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }

    })
    .catch(err => { throw err })


// insertEvent(mockEvent)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

const deleteTestEvents = async () => {
    const events = await getEventsForRange({
        timeMin: getISOString({ hourOffset: -24 }),
        timeMax: getISOString({ hourOffset: 24 }),
        timeZone: TIME_ZONE
    })
    // console.log(events)
    events.forEach(async (event) => {
        const { description, id } = event
        if (description === 'This is the description.') {
            console.log(event)
            let response = await deleteEventById(id);
            console.log(response)
        }
    })

}
    // deleteTestEvents()