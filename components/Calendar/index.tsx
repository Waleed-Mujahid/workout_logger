'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import "./calendar.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Calendar() {
    // const { events, updateEvent } = useEventData()

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3" id="Calendar">
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View your upcoming workouts and events.</CardDescription>
            </CardHeader>
            <CardContent className='calendarContainer'>

                <FullCalendar
                    height="600px"
                    contentHeight={
                        "30px"
                    }
                    plugins={[dayGridPlugin,
                        timeGridPlugin,

                        interactionPlugin,]}
                    initialView="timeGridWeek"
                    // events={events}
                    // eventContent={(eventInfo) => (
                    //     <TaskPopover event={eventInfo.event} />
                    // )}
                    handleWindowResize={true}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay,dayGridMonth'
                    }}
                    displayEventTime={true}
                    nowIndicator={true}
                    editable={true}
                    selectMirror={true}
                    eventTimeFormat={{
                        hour: "numeric",
                        minute: "2-digit",
                        meridiem: "short",
                    }}
                    // eventResize={updateEvent}
                    // eventDrop={updateEvent}
                    timeZone="UTC"
                    locale='en'
                />

            </CardContent>
        </Card >
    )
}