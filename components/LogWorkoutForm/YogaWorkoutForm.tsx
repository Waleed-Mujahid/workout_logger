// YogaWorkoutForm.tsx
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WorkoutSession } from "@/lib/schema";

interface YogaWorkoutFormProps {
    control: Control<WorkoutSession>;
}

const YogaWorkoutForm: React.FC<YogaWorkoutFormProps> = ({ control }) => {
    return (
        <FormField
            control={control}
            name="workout.style"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Style</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Style (e.g., Vinyasa, Hatha)" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default YogaWorkoutForm;