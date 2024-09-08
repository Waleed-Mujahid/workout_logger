'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkoutStats } from '@/lib/schema';
import { getWorkoutStats } from '@/db/workout_stats';
import { useToast } from "@/components/ui/use-toast"
import useSWR from 'swr';
import SummaryItem from './SummaryItem';

const DashboardSummary = () => {
  const { data, error } = useSWR<{ stats: WorkoutStats | null, error: boolean }>("workout_stats", getWorkoutStats);
  const { toast } = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [error, toast]);

  const isLoading = !data && !error;

  // generate random stats for testing
  const stats = data?.stats ?? {
    total_workouts: 0,
    total_time_spent: 0,
    total_calories_burned: 0,
    total_weight_lifted: 0,
  };

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3" id="Dashboard">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Your workout summary and progress at a glance.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryItem title="Total Workouts" value={stats.total_workouts} isLoading={isLoading} />
        <SummaryItem
          title="Time Spent"
          value={`${Math.floor(stats.total_time_spent / 60)} hrs ${stats.total_time_spent % 60} mins`}
          isLoading={isLoading}
        />
        <SummaryItem title="Calories Burned" value={stats.total_calories_burned} isLoading={isLoading} />
        <SummaryItem title="Total Weight Lifted" value={stats.total_weight_lifted} unit=" lbs" isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;