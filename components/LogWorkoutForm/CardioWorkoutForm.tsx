// CardioWorkoutForm.tsx
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WorkoutSession } from "@/lib/schema";

interface CardioWorkoutFormProps {
    control: Control<WorkoutSession>;
}

const CardioWorkoutForm: React.FC<CardioWorkoutFormProps> = ({ control }) => {
    return (
        <FormField
            control={control}
            name="workout.distance"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Distance (km or miles)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} placeholder="Distance (km or miles)" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CardioWorkoutForm;