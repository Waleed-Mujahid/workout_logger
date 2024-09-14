import React from "react";

import { Control, useFieldArray } from "react-hook-form";

import { WorkoutSession } from "@/lib/schema";
import { Button } from "@/components/ui/button";

import ExerciseFields from "./ExerciseFields";

interface TraditionalWorkoutFormProps {
    control: Control<WorkoutSession>;
}

const TraditionalWorkoutForm: React.FC<TraditionalWorkoutFormProps> = ({ control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workout.exercises",
    });

    return (
        <div className="space-y-4">
            <Button
                type="button"
                onClick={() =>
                    append({
                        name: "", // default value for the name
                        muscle_group: "biceps", // default value for muscle group
                        notes: "", // default value for notes
                        sets: 0,
                        reps: 0,
                        weight: 0,
                        duration: 0,
                        rest_time: 0,
                    })
                }
            >
                Add Exercise
            </Button>
            {fields.map((field, index) => (
                <ExerciseFields
                    key={field.id}
                    control={control}
                    index={index}
                    remove={() => remove(index)}
                />
            ))}
        </div>
    );
};

export default TraditionalWorkoutForm;