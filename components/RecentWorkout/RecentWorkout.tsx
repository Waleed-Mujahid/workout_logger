'use client';
import React from 'react';

import useUserWorkoutSessions from '@/hooks/useUserWorkoutSessions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { WorkoutLog } from './WorkoutLog';
import RecentWorkoutSession from './RecentWorkoutSession';
import WorkoutDetailSkeleton from './WorkoutDetailSkeleton';

export const RecentWorkout: React.FC = () => {
  const { sessions, error, isLoading } = useUserWorkoutSessions();

  if (error) {
    return (
      <Card id="Exercises" className="border-b-0">
        <CardHeader>
          <CardTitle>Recent Workout</CardTitle>
          <CardDescription>Your most recent workout details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error fetching workout data. Please try again later.</div>
        </CardContent>
      </Card>
    );
  }

  const recentSession = sessions?.[0];
  const exercises = recentSession?.exercises;

  return (
    <Card id="Exercises" className="border-b-0">
      <CardHeader>
        <CardTitle>Recent Workout</CardTitle>
        <CardDescription>Your most recent workout details.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <WorkoutDetailSkeleton />
        ) : recentSession ? (
          <>
            <RecentWorkoutSession workout={recentSession} />
            {exercises && <WorkoutLog exercises={exercises} />}
          </>
        ) : (
          <div>No recent workout sessions found. Start logging your workouts to see them here!</div>
        )}
      </CardContent>
    </Card>
  );
};
