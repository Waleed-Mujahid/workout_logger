'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MuscleGroupTabs from './MuscleGroupTab';
import { getUserExercises } from '@/db/exercises_library';
import { Exercises_library } from '@/db/types';

const ExerciseLibrary: React.FC = () => {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exercise Library</CardTitle>
        <CardDescription>Browse exercises by muscle group</CardDescription>
      </CardHeader>
      <CardContent>
        <MuscleGroupTabs exercises={exercises} loading={loading} />
      </CardContent>
    </Card>
  );
};

export default ExerciseLibrary;
