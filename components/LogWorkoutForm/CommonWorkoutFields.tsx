// CommonWorkoutFields.tsx
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WorkoutSession } from "@/lib/schema";

interface CommonWorkoutFieldsProps {
    control: Control<WorkoutSession>;
}

const CommonWorkoutFields: React.FC<CommonWorkoutFieldsProps> = ({ control }) => {
    return (
        <>
            <FormField
                control={control}
                name="total_duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Total Duration (min)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Total duration (min)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="calories_burned"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Calories Burned</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Calories burned" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Add any notes about your workout" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="date"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                type="date"
                                placeholder="Data de nascimento"
                                {...field}
                                value={
                                    field.value instanceof Date
                                        ? field.value.toISOString().split('T')[0]
                                        : field.value
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

export default CommonWorkoutFields;