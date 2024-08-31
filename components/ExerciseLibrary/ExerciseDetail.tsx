import React from 'react';
import { Clock, Weight, Repeat, ClipboardList, RotateCcw } from 'lucide-react';
import ExerciseInfoItem from './ExerciseInfoItem';
import { Exercise } from '@/lib/schema';

interface ExerciseDetailProps {
    exercise: Exercise;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground">{exercise.muscle_group}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {exercise.sets && <ExerciseInfoItem icon={Repeat} label="Sets" value={exercise.sets} />}
                {exercise.reps && <ExerciseInfoItem icon={Repeat} label="Reps" value={exercise.reps} />}
                {exercise.weight && <ExerciseInfoItem icon={Weight} label="Weight" value={`${exercise.weight} kg`} />}
                {exercise.duration && <ExerciseInfoItem icon={Clock} label="Duration" value={`${exercise.duration} min`} />}
                {exercise.rest_time && <ExerciseInfoItem icon={RotateCcw} label="Rest" value={`${exercise.rest_time} sec`} />}
            </div>

            {exercise.notes && (
                <div className="pt-4 border-t">
                    <h4 className="font-medium flex items-center mb-2">
                        <ClipboardList className="w-4 h-4 mr-2" />
                        Notes
                    </h4>
                    <p className="text-sm text-muted-foreground">{exercise.notes}</p>
                </div>
            )}
        </div>
    );
};

export default ExerciseDetail;
