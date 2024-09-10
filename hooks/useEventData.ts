import { useEffect, useState } from 'react';

import { CalendarEvent } from '@/db/types';
import { getEventColorScheme } from '@/lib/utils';

import useUserWorkoutSessions from './useUserWorkoutSessions';

function useEventData() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const { sessions, error, isLoading } = useUserWorkoutSessions();

    useEffect(() => {
        if (!isLoading && sessions) {
            const mappedEvents = sessions.map(session => {
                const startUTC = new Date(session.date); // UTC start date
                const endUTC = new Date(startUTC.getTime() + Math.max(session.total_duration, 30) * 60000);

                const startLocal = new Date(startUTC.toLocaleString());
                const endLocal = new Date(endUTC.toLocaleString());

                return {
                    id: session.id,
                    title: session.workout_type,
                    data: session,
                    start: startLocal,
                    end: endLocal,
                    exercises: session.exercises,
                    ...getEventColorScheme(session.workout_type),
                    editable: false,
                    startEditable: false,
                    durationEditable: false,
                    resourceEditable: false,
                    overlap: false,
                    allDay: false,
                };
            });

            // Set the events in state
            setEvents(mappedEvents);
        }
    }, [sessions, isLoading]); // Re-run when sessions or loading state changes

    return {
        events,
        setEvents,
        error,
    };
}

export default useEventData;
