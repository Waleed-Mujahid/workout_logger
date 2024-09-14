'use client'

import useExerciseLibrary from '@/hooks/useExerciseLibrary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import MuscleGroupTabs from './MuscleGroupTab';

const ExerciseLibrary: React.FC = () => {
  const { exercises, loading, error } = useExerciseLibrary();

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
