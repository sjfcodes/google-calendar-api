
class Calendar {

    constructor({ auth, calendar, calendarId }) {

        this.credentials = { auth, calendarId }
        this.calendar = calendar

    }

    getISOString = ({
        date = new Date(),
        hourOffset = 0
    }) => {
        const hourInMilliseconds = (60 * 60) * 1000
        const futureHour = hourInMilliseconds * hourOffset
        return new Date(date.getTime() + futureHour).toISOString()
    }

    // Get all the events between two dates
    getEventsForRange = async ({ timeMin, timeMax, timeZone }) =>
        await this.calendar
            .events
            // https://googleapis.dev/nodejs/googleapis/latest/calendar/classes/Resource$Events.html#list
            .list({
                ...this.credentials,
                timeMin,
                timeMax,
                timeZone,
            })
            .then(({ data: { items } }) => items)

    getUpcomingEvents = async ({ maxResults = 10 }) =>
        await this.calendar
            .events
            .list({
                ...this.credentials,
                timeMin: (new Date()).toISOString(),
                maxResults,
                singleEvents: true,
                orderBy: 'startTime',
            })
            .then(({ data: { items } }) => items)


    insertEvent = async (event) =>
        await this.calendar
            .events
            .insert({
                ...this.credentials,
                resource: event
            })
            .then(({ data }) => data);

    deleteEventById = async (eventId) =>
        await this.calendar
            .events
            .delete({
                ...this.credentials,
                eventId
            })


    // printEvents = (events) => {

    // }
};

module.exports = Calendar;