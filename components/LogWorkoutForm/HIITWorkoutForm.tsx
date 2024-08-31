// HIITWorkoutForm.tsx
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkoutSession } from "@/lib/schema";
import ExerciseFields from "./ExerciseFields";

interface HIITWorkoutFormProps {
    control: Control<WorkoutSession>;
}

const HIITWorkoutForm: React.FC<HIITWorkoutFormProps> = ({ control }) => {
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
                    sets: 0,
                    reps: 0,
                    weight: 0,
                    duration: 0,
                    rest_time: 0,
                    notes: "write notes here",
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
            <FormField
                control={control}
                name="workout.rounds"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rounds</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Rounds" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="workout.rest"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rest (sec)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Rest (sec)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default HIITWorkoutForm;