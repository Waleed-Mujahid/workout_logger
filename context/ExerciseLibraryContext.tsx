'use client'

import React, { createContext, useEffect, useState } from 'react';

import { Exercises_library } from '@/db/types';
import { getUserExercises } from '@/db/exercises_library';

type ExerciseLibraryContextType = {
    exercises: Exercises_library[];
    loading: boolean;
    error: string | null;
};

export const ExerciseLibraryContext = createContext<ExerciseLibraryContextType | undefined>(undefined);

export const ExerciseLibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [exercises, setExercises] = useState<Exercises_library[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const { stats, error } = await getUserExercises();
                if (error) {
                    setError('Failed to fetch exercises');
                } else {
                    setExercises(stats);
                }
            } catch {
                setError('Failed to fetch exercises');
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    return (
        <ExerciseLibraryContext.Provider value={{ exercises, loading, error }}>
            {children}
        </ExerciseLibraryContext.Provider>
    );
};

