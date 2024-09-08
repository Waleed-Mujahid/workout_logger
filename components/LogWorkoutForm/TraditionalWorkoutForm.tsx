// TraditionalWorkoutForm.tsx
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { WorkoutSession } from "@/lib/schema";
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
                onClick={() => append({
                    name: "",
                    muscle_group: "biceps",
                    notes: "",
                })}
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