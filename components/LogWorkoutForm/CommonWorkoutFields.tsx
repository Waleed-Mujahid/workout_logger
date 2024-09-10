import React from "react";

import { Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { WorkoutSession } from "@/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
                                type="datetime-local"
                                placeholder="Select date and time"
                                {...field}
                                value={
                                    field.value instanceof Date
                                        ? new Date(field.value).toISOString().slice(0, 16) // Format to 'YYYY-MM-DDTHH:MM'
                                        : field.value
                                }
                                onChange={(e) => field.onChange(e.target.value)}
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