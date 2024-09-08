import React from 'react'
import WorkoutDetail from './WorkoutDetails';
import { formattedDate, formatDuration } from '@/lib/utils';
import { WorkoutSession } from '@/db/types';

export default function RecentWorkoutSession({ workout }: {
    workout: WorkoutSession | null
}) {
    return (
        <>
            {workout ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <WorkoutDetail title="Workout Type" value={workout.workout_type} />
                    <WorkoutDetail title="Date" value={formattedDate(workout.date)} />
                    <WorkoutDetail title="Duration" value={formatDuration(workout.total_duration)} />
                    <WorkoutDetail title="Calories Burned" value={workout.calories_burned.toString()} />
                </div>) : (
                <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    No Data available
                </span>
            )}
        </>
    )
}
