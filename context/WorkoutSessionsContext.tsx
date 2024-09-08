'use client'

import { WorkoutSession } from '@/db/types';
import { getUserWorkoutSessions } from '@/db/workout_sessions';
import { createContext, useContext } from 'react';
import useSWR, { KeyedMutator } from 'swr';

interface WorkoutSessionsContextType {
    sessions: WorkoutSession[] | null | undefined;
    error: boolean;
    isLoading: boolean;
    mutate: KeyedMutator<WorkoutSession[] | null>; 
}

// Create context
export const WorkoutSessionsContext = createContext<WorkoutSessionsContextType | undefined>(undefined);

// SWR fetcher function
const fetcher = async (): Promise<WorkoutSession[] | null> => {
    const { sessions, error } = await getUserWorkoutSessions();
    if (error) {
        throw new Error("Failed to fetch sessions");
    }
    return sessions;
};


// Provider component
export const WorkoutSessionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: sessions, error, isLoading, mutate } = useSWR<WorkoutSession[] | null>('userWorkoutSessions', fetcher);

    return (
        <WorkoutSessionsContext.Provider value={{ sessions, error: !!error, isLoading: !sessions && !error, mutate }}>
            {children}
        </WorkoutSessionsContext.Provider>
    );
};
