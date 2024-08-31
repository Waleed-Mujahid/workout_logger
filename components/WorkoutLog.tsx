import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LogItem: React.FC<{ title: string; value: string | React.ReactNode }> = ({ title, value }) => (
  <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
    <div className="text-sm font-medium text-muted-foreground">{title}</div>
    <div className={typeof value === 'string' ? 'text-lg font-bold' : ''}>{value}</div>
  </div>
);

export const WorkoutLog: React.FC = () => (
  <Card className="basis-1/2">
    <CardHeader>
      <CardTitle>Workout Log</CardTitle>
      <CardDescription>Log your exercises, sets, reps, and weights.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <LogItem title="Exercise" value="Barbell Bench Press" />
      <LogItem title="Sets x Reps" value="4 x 10" />
      <LogItem title="Weight" value="225 lbs" />
      <LogItem title="Rest Time" value="2 min" />
      <LogItem
        title="Notes"
        value={
          <div className="text-lg">
            Felt strong today, pushed out an extra rep on the last set.
          </div>
        }
      />
    </CardContent>
  </Card>
);
