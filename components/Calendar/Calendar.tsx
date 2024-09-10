'use client'
import FullCalendar from '@fullcalendar/react'
import useEventData from '@/hooks/useEventData'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import ShowWorkoutSession from './ShowWorkoutSession'

function Calendar() {
    const { events } = useEventData()


    return (
        <>
            <FullCalendar
                height="600px"
                events={events}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                ]}
                initialView="dayGridMonth"
                eventContent={(eventInfo) => (
                    <ShowWorkoutSession event_id={eventInfo.event.id} />
                )}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth'
                }}
                nowIndicator={true}
                // editable={true}
                selectMirror={true}
                eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                }}
                displayEventTime={false}
                displayEventEnd={false}
                eventDisplay='block'
            // eventResize={updateEvent}
            // eventDrop={updateEvent}
            // timeZone="UTC"
            // locale='en'
            />
        </>
    )
}

export default Calendar