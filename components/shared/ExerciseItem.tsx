import React from 'react';

import { Exercise } from '@/lib/schema';

interface ExerciseItemProps {
    exercise: Exercise;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
    return (
        <li className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
            <div className="font-semibold text-lg mb-2">
                {exercise.name} <span className="text-gray-500">({exercise.muscle_group})</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
                {exercise.sets && exercise.reps && exercise.weight && (
                    <span className="font-medium">
                        {exercise.sets}x{exercise.reps} @ {exercise.weight}kg
                    </span>
                )}
                {exercise.duration && (
                    <span className="ml-2">
                        | {exercise.duration} min
                    </span>
                )}
                {exercise.rest_time && (
                    <span className="ml-2">
                        | Rest: {exercise.rest_time} min
                    </span>
                )}
            </div>
            {exercise.notes && (
                <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Note:</span> {exercise.notes}
                </div>
            )}
        </li>
    );
};

export default ExerciseItem;
