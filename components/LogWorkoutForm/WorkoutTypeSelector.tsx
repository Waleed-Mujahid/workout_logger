// WorkoutTypeSelector.tsx
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { WorkoutSession } from "@/lib/schema";

interface WorkoutTypeSelectorProps {
  control: Control<WorkoutSession>;
  setWorkoutType: (type: string) => void;
}

const WorkoutTypeSelector: React.FC<WorkoutTypeSelectorProps> = ({ control, setWorkoutType }) => {
  return (
    <FormField
      control={control}
      name="workout.type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Workout Type</FormLabel>
          <Select onValueChange={(value) => {
            field.onChange(value);
            setWorkoutType(value);
          }}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="hiit">HIIT Weight Training</SelectItem>
              <SelectItem value="traditional">Traditional Weight Training</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WorkoutTypeSelector;