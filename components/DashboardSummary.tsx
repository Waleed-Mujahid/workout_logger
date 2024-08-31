'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkoutStats } from '@/lib/schema';
import { getUserStats } from '@/db/workout_stats';
import { useToast } from "@/components/ui/use-toast"


const SummaryItem: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
    <div className="text-sm font-medium text-muted-foreground">{title}</div>
    <div className="text-3xl font-bold">{value}</div>
  </div>
);

export const DashboardSummary = () => {
  const [stats, setStats] = React.useState<WorkoutStats>({
    total_workouts: 0,
    total_time_spent: 0,
    total_calories_burned: 0,
    total_weight_lifted: 0,
  });
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchStats = async () => {
      const { stats, error } = await getUserStats();
      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
        return;
      }
      stats.map((stat) => setStats(stat));
    }

    fetchStats();
  }, [toast]);


  return (<Card className="col-span-1 md:col-span-2 lg:col-span-3" id="Dashboard">
    <CardHeader>
      <CardTitle>Dashboard</CardTitle>
      <CardDescription>Your workout summary and progress at a glance.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryItem title="Total Workouts" value={stats.total_workouts.toString()} />
      <SummaryItem title="Time Spent" value={stats.total_time_spent.toString()} />
      <SummaryItem title="Calories Burned" value={stats.total_calories_burned.toString()} />
      <SummaryItem title="Total Weight Lifted" value={stats.total_weight_lifted?.toString() ?? "0"} />
    </CardContent>
  </Card>)
}
