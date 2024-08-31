// LogWorkoutForm.tsx
'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { WorkoutSession, WorkoutSessionSchema } from "@/lib/schema";
import { saveWorkoutData } from "@/db/workout_sessions";
import WorkoutTypeSelector from "./WorkoutTypeSelector";
import HIITWorkoutForm from "./HIITWorkoutForm";
import TraditionalWorkoutForm from "./TraditionalWorkoutForm";
import CardioWorkoutForm from "./CardioWorkoutForm";
import YogaWorkoutForm from "./YogaWorkoutForm";
import CommonWorkoutFields from "./CommonWorkoutFields";

export const LogWorkoutForm: React.FC = () => {
    const [workoutType, setWorkoutType] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<WorkoutSession>({
        resolver: zodResolver(WorkoutSessionSchema),
        defaultValues: {
            date: new Date(),
            workout: { type: undefined },
            total_duration: 0,
            calories_burned: 0,
            notes: "",
        },
    });

    const onSubmit = async (data: WorkoutSession) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await saveWorkoutData(data);
            console.log("Workout submitted successfully");
            form.reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card id="Log Workout">
            <CardHeader>
                <CardTitle>Log Workout</CardTitle>
                <CardDescription>Record your latest workout session.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <WorkoutTypeSelector
                            control={form.control}
                            setWorkoutType={setWorkoutType}
                        />

                        {workoutType === "hiit" && <HIITWorkoutForm control={form.control} />}
                        {workoutType === "traditional" && <TraditionalWorkoutForm control={form.control} />}
                        {workoutType === "cardio" && <CardioWorkoutForm control={form.control} />}
                        {workoutType === "yoga" && <YogaWorkoutForm control={form.control} />}

                        <CommonWorkoutFields control={form.control} />

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Workout"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LogWorkoutForm;