import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WorkoutDetail: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
    <div className="text-sm font-medium text-muted-foreground">{title}</div>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

export const RecentWorkout: React.FC = () => (
  <Card className="basis-1/2" id="Exercises">
    <CardHeader>
      <CardTitle>Recent Workout</CardTitle>
      <CardDescription>Your most recent workout details.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-6">
      <WorkoutDetail title="Workout Type" value="Strength Training" />
      <WorkoutDetail title="Date" value="August 19, 2024" />
      <WorkoutDetail title="Duration" value="1 hr 15 min" />
      <WorkoutDetail title="Calories Burned" value="650" />
    </CardContent>
  </Card>
);

