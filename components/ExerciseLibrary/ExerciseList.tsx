import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import ResponsiveDetailWrapper from './ResponsiveDetailWrapper';
import { Exercises_library } from '@/db/types';

interface ExerciseListProps {
    muscleGroup: string;
    exercises: Exercises_library[] | null;
    loading: boolean;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ muscleGroup, exercises, loading }) => {
    const filteredExercises = exercises?.filter(
        (exercise) => exercise.muscle_group.toLowerCase() === muscleGroup.toLowerCase()
    );

    return (
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                    ? [...Array(5)].map((_, index) => (
                        <div key={index} className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))
                    : filteredExercises?.slice(0, 5).map((exercise, index) => (
                        <ResponsiveDetailWrapper key={index} exercise={exercise} />
                    ))}
            </div>
        </ScrollArea>
    );
};

export default ExerciseList;
