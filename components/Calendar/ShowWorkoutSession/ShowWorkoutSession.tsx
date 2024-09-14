import React, { useEffect, useState } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { WorkoutSession } from '@/db/types';
import useEventData from '@/hooks/useEventData';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseDate, parseNumber } from '@/lib/schema';

import ResponsiveContainer from './ResponsiveContainer';

const WorkoutSessionSchema = z.object({
    date: z.preprocess(parseDate, z.date()),
    total_duration: z.preprocess(parseNumber, z.number().min(1)),
    calories_burned: z.preprocess(parseNumber, z.number().min(1)),
    notes: z.string().optional(),
    yoga_style: z.string().nullable().optional(),
    HITT_rounds: z.preprocess(parseNumber, z.number().min(1).optional()),
    HITT_rest: z.preprocess(parseNumber, z.number().min(1).optional()),
});

interface ShowWorkoutSessionProps {
    event_id: string;
}

const ShowWorkoutSession: React.FC<ShowWorkoutSessionProps> = ({ event_id }) => {
    const { events, handleDeleteEvent, handleDeleteExercise, handleEditExercise, handleEditSession } = useEventData();
    const session = events.find((event) => event.id === event_id)?.data;
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<WorkoutSession>({
        resolver: zodResolver(WorkoutSessionSchema),
        defaultValues: session,
    });

    useEffect(() => {
        if (session && !isEditing) {
            form.reset(session);
        }
    }, [session, isEditing, form]);

    if (!session) return null;

    const handleDelete = () => {
        handleDeleteEvent(event_id);
    };

    const onSubmit = async (data: WorkoutSession) => {
        handleEditSession(event_id, data);
        setIsEditing(false);
    };

    return (
        <ResponsiveContainer
            session={session}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            form={form}
            onSubmit={onSubmit}
            handleDelete={handleDelete}
            handleDeleteExercise={handleDeleteExercise}
            handleEditExercise={handleEditExercise}
        />
    );
};

export default ShowWorkoutSession;
