import React from 'react';
import { Weight, ClipboardList } from 'lucide-react';
import { Exercises_library } from '@/db/types';

const ExerciseDetail: React.FC<{ exercise: Exercises_library }> = ({ exercise }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground">{exercise.muscle_group}</p>
            </div>

            {exercise.equipment.length > 0 && (
                <div className="pt-4 border-t">
                    <h4 className="font-medium flex items-center mb-2">
                        <Weight className="w-4 h-4 mr-2" />
                        Equipment Required
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {exercise.equipment.map((equipment, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                                {equipment}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {exercise.instructions && (
                <div className="pt-4 border-t">
                    <h4 className="font-medium flex items-center mb-2">
                        <ClipboardList className="w-4 h-4 mr-2" />
                        Notes
                    </h4>
                    <p className="text-sm text-muted-foreground">{exercise.instructions}</p>
                </div>
            )}
        </div>
    );
};

export default ExerciseDetail;
