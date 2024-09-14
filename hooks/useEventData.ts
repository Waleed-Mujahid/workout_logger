import { useEffect, useState } from 'react';

import { CalendarEvent, Exercise, WorkoutSession } from '@/db/types';
import { getEventColorScheme } from '@/lib/utils';

import useUserWorkoutSessions from './useUserWorkoutSessions';
import { deleteWorkoutSession, deleteExercise, editExercise, updateWorkoutSession } from '@/db/workout_sessions';
import { mutate } from 'swr';

function useEventData() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const { sessions, error, isLoading, mutate: sessionMutate } = useUserWorkoutSessions();

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

            setEvents(mappedEvents);
        }
    }, [sessions, isLoading]);

    const handleDeleteEvent = async (sessionId: string) => {
        const previousEvents = [...events];
        const previousSessions = [...sessions || []];

        setEvents(events.filter(event => event.id !== sessionId));

        try {
            sessionMutate(
                (sessions) => {
                    if (!sessions) return sessions;

                    const updatedSessions = sessions.filter((session) => session.id !== sessionId);
                    return updatedSessions;
                },
                false // Optimistic update
            );
            Promise.all([
                deleteWorkoutSession(sessionId),
                mutate("workout_stats"),
            ]);
        } catch (error) {
            console.error("Error deleting workout session from context:", error);
            setEvents(previousEvents); // Rollback events
            mutate(previousSessions, false); // Rollback sessions
            mutate("workout_stats");
        }
    };

    const handleDeleteExercise = async (sessionId: string, exerciseId: string) => {
        const previousEvents = [...events];
        const previousSessions = [...sessions || []];

        setEvents(events.map(event => {
            if (event.id === sessionId) {
                return {
                    ...event,
                    exercises: event.exercises.filter(exercise => exercise.id !== exerciseId),
                };
            }
            return event;
        }));

        try {
            sessionMutate(
                (sessions) => {
                    if (!sessions) return sessions;

                    const sessionToUpdate = sessions.find(session => session.id === sessionId);
                    if (!sessionToUpdate) return sessions;

                    const updatedExercises = sessionToUpdate.exercises.filter(ex => ex.id !== exerciseId);
                    const updatedSession = { ...sessionToUpdate, exercises: updatedExercises };

                    return sessions.map(session => session.id === sessionId ? updatedSession : session);
                },
                false // Optimistic update
            );
            Promise.all([
                deleteExercise(sessionId, exerciseId),
                mutate("workout_stats"),
            ]);
        } catch (error) {
            console.error("Error deleting exercise from session in context:", error);
            setEvents(previousEvents); // Rollback events
            mutate(previousSessions, false); // Rollback sessions
            mutate("workout_stats");
        }
    };

    const handleEditExercise = async (sessionId: string, exercise: Exercise) => {
        const previousEvents = [...events];
        const previousSessions = [...sessions || []];

        setEvents(events.map(event => {
            if (event.id === sessionId) {
                return {
                    ...event,
                    exercises: event.exercises.map(ex => (ex.id === exercise.id ? { ...ex, ...exercise } : ex)),
                };
            }
            return event;
        }));

        try {
            sessionMutate(
                (sessions) => {
                    if (!sessions) return sessions;

                    const sessionToUpdate = sessions.find(session => session.id === sessionId);
                    if (!sessionToUpdate) return sessions;

                    const updatedExercises = sessionToUpdate.exercises.map(ex => (ex.id === exercise.id ? { ...ex, ...exercise } : ex));
                    const updatedSession = { ...sessionToUpdate, exercises: updatedExercises };

                    return sessions.map(session => session.id === sessionId ? updatedSession : session);
                },
                false // Optimistic update
            );
            Promise.all([
                editExercise(sessionId, exercise),
                mutate("workout_stats"),
            ]);
        } catch (error) {
            console.error("Error updating exercise in session in context:", error);
            setEvents(previousEvents); // Rollback events
            mutate("workout_stats")
            mutate(previousSessions, false); // Rollback sessions
        }
    };

    const handleEditSession = async (sessionId: string, data: WorkoutSession) => {
        const previousEvents = [...events];
        const previousSessions = [...sessions || []];

        setEvents(events.map(event => {
            if (event.id === sessionId) {
                return {
                    ...event,
                    data: {
                        ...event.data,
                        ...data,
                    },
                };
            }
            return event;
        }));

        try {
            sessionMutate(
                (sessions) => {
                    if (!sessions) return sessions;

                    const sessionToUpdate = sessions.find(session => session.id === sessionId);
                    if (!sessionToUpdate) return sessions;

                    const updatedSession = { ...sessionToUpdate, ...data };

                    return sessions.map(session => session.id === sessionId ? updatedSession : session);
                },
                false // Optimistic update
            );
            Promise.all([
                updateWorkoutSession(sessionId, data),
                mutate("workout_stats"),
            ]);
        } catch (error) {
            console.error("Error updating workout session in context:", error);
            setEvents(previousEvents); // Rollback events
            mutate(previousSessions, false); // Rollback sessions
            mutate("workout_stats");
        }
    };

    return {
        events,
        setEvents,
        handleDeleteEvent,
        handleEditSession,
        handleEditExercise,
        handleDeleteExercise,
        error,
    };
}

export default useEventData;
