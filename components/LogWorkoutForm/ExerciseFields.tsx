// ExerciseFields.tsx
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { WorkoutSession, MuscleGroupEnum } from "@/lib/schema";

interface ExerciseFieldsProps {
    control: Control<WorkoutSession>;
    index: number;
    remove: () => void;
}

const ExerciseFields: React.FC<ExerciseFieldsProps> = ({ control, index, remove }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={control}
                name={`workout.exercises.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Exercise name" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.muscle_group`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <span>{field.value || 'Select muscle group'}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    {MuscleGroupEnum.options.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.sets`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Sets" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.reps`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Reps" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.weight`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Weight (kg)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.duration`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Duration (min)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.rest_time`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Rest Time (s)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`workout.exercises.${index}.notes`}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Notes" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button variant="destructive" onClick={remove}>
                Remove
            </Button>
        </div>
    );
};

export default ExerciseFields;