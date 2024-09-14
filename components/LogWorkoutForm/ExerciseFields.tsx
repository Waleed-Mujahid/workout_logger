'use client';

import React, { useEffect, useRef, useState } from "react";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AutoComplete } from "@/components/ui/autocomplete";
import useExerciseLibrary from "@/hooks/useExerciseLibrary";
import { MuscleGroupEnum, WorkoutSession } from "@/lib/schema";
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Button } from "../ui/button";

interface ExerciseFieldsProps {
    control: Control<WorkoutSession>;
    index: number;
    remove: () => void;
}

const ExerciseFields: React.FC<ExerciseFieldsProps> = ({
    control,
    index,
    remove,
}) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");

    const { exercises, loading } = useExerciseLibrary();
    const inputRef = useRef<HTMLInputElement>(null);
    const autoCompleteRef = useRef<HTMLInputElement>(null);

    const exerciseOptions = exercises.map((exercise) => ({
        value: exercise.name,
        label: exercise.name,
        muscleGroup: exercise.muscle_group,
    }));

    const filteredOptions = exerciseOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        if (filteredOptions.length === 0 && !loading) {
            inputRef.current?.focus();
        } else {
            autoCompleteRef.current?.focus();
        }
    }, [filteredOptions.length, loading]);

    const handleExerciseSelection = (selectedExercise: string) => {
        const matchedExercise = exerciseOptions.find(
            (exercise) => exercise.value === selectedExercise
        );

        if (matchedExercise) {
            setSelectedMuscleGroup(matchedExercise.muscleGroup); // Automatically set the muscle group
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Exercise Name or AutoComplete */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Exercise Name</FormLabel>
                        <FormControl>
                            {filteredOptions.length === 0 && !loading ? (
                                <Input
                                    {...field}
                                    ref={inputRef}
                                    placeholder="Enter custom exercise name"
                                    value={searchValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value); // Update form value
                                        setSearchValue(value); // Keep track of input
                                    }}
                                />
                            ) : (
                                <AutoComplete
                                    selectedValue={selectedValue}
                                    onSelectedValueChange={(value) => {
                                        setSelectedValue(value);
                                        field.onChange(value); // Update form value
                                        handleExerciseSelection(value); // Automatically select muscle group
                                    }}
                                    searchValue={searchValue}
                                    onSearchValueChange={(value) => setSearchValue(value)}
                                    items={filteredOptions}
                                    isLoading={loading}
                                    emptyMessage="No items found."
                                    placeholder="Search or enter custom exercise..."
                                    ref={autoCompleteRef}
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Muscle Group */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.muscle_group`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Muscle Group</FormLabel>
                        <FormControl>
                            <Select
                                value={selectedMuscleGroup || field.value} // Set muscle group based on selection
                                onValueChange={(value) => {
                                    setSelectedMuscleGroup(value);
                                    field.onChange(value); // Update form value
                                }}
                            >
                                <SelectTrigger>
                                    <span>{selectedMuscleGroup || field.value || "Select muscle group"}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    {MuscleGroupEnum.options.map((option) => (
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

            {/* Sets */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.sets`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sets</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Sets" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Reps */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.reps`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reps</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Reps" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Weight */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.weight`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Weight (kg)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Duration */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.duration`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Duration (min)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Duration (min)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Rest Time */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.rest_time`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rest Time (s)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} placeholder="Rest Time (s)" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Notes */}
            <FormField
                control={control}
                name={`workout.exercises.${index}.notes`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Notes" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Remove Button */}
            <Button variant="destructive" onClick={remove}>
                Remove
            </Button>
        </div>
    );
};

export default ExerciseFields;
