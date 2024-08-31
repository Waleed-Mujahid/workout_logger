"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { WorkoutSession, WorkoutSessionSchema } from '@/lib/schema';

export const LogWorkoutForm: React.FC = () => {
  const [workoutType, setWorkoutType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<WorkoutSession>({
    resolver: zodResolver(WorkoutSessionSchema),
    defaultValues: {
      id: "",
      date: new Date(),
      workout: { type: undefined },
      totalDuration: 0,
      caloriesBurned: 0,
    },
  });

  const onSubmit = async (data: WorkoutSession) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await submitWorkout(data);
      console.log("Workout submitted successfully");
      reset();
      setWorkoutType("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3" id="Log Workout">
      <CardHeader>
        <CardTitle>Log Workout</CardTitle>
        <CardDescription>Record your latest workout session.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Workout Type */}
          <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-medium text-muted-foreground">Workout Type</div>
            <Controller
              name="workout.type"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setWorkoutType(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiit">HIIT Weight Training</SelectItem>
                    <SelectItem value="traditional">Traditional Weight Training</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Exercises */}
          <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-medium text-muted-foreground">Exercises</div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select exercises" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bench-press">Barbell Bench Press</SelectItem>
                <SelectItem value="deadlift">Deadlift</SelectItem>
                <SelectItem value="squat">Barbell Squat</SelectItem>
                <SelectItem value="pull-up">Pull-up</SelectItem>
                <SelectItem value="shoulder-press">Overhead Shoulder Press</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional fields based on workout type */}
          {workoutType === "hiit" && (
            <>
              <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm font-medium text-muted-foreground">Rounds</div>
                <Input type="number" {...register("workout.rounds")} placeholder="Rounds" />
              </div>
              <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm font-medium text-muted-foreground">Duration & Rest</div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" {...register("workout.duration")} placeholder="Duration (min)" />
                  <Input type="number" {...register("workout.rest")} placeholder="Rest (sec)" />
                </div>
              </div>
            </>
          )}

          {workoutType === "traditional" && (
            <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground">Sets x Reps</div>
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" {...register("workout.sets")} placeholder="Sets" />
                <Input type="number" {...register("workout.reps")} placeholder="Reps" />
              </div>
              {errors.workout?.sets && <p className="text-red-500">{errors.workout.sets.message}</p>}
              {errors.workout?.reps && <p className="text-red-500">{errors.workout.reps.message}</p>}
            </div>
          )}

          {/* Notes */}
          <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-medium text-muted-foreground">Notes</div>
            <Textarea {...register("notes")} placeholder="Add any notes about your workout" />
            {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Workout"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

