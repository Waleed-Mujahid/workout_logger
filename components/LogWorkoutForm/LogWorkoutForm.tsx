'use client'
import React, { useState } from "react";

import { mutate } from "swr";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveWorkoutData } from "@/db/workout_sessions";
import LoadingButton from "@/components/shared/LoadingButton";
import { WorkoutSession, WorkoutSessionSchema } from "@/lib/schema";
import useUserWorkoutSessions from "@/hooks/useUserWorkoutSessions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import HIITWorkoutForm from "./HIITWorkoutForm";
import YogaWorkoutForm from "./YogaWorkoutForm";
import CardioWorkoutForm from "./CardioWorkoutForm";
import WorkoutTypeSelector from "./WorkoutTypeSelector";
import CommonWorkoutFields from "./CommonWorkoutFields";
import TraditionalWorkoutForm from "./TraditionalWorkoutForm";

export const LogWorkoutForm: React.FC = () => {
    const [workoutType, setWorkoutType] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { mutate: sessionMutate } = useUserWorkoutSessions();

    const form = useForm<WorkoutSession>({
        resolver: zodResolver(WorkoutSessionSchema)
    });

    const onSubmit = async (data: WorkoutSession) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await saveWorkoutData(data);
            Promise.all([
                mutate("workout_stats"),
                sessionMutate(),
            ]);
            form.reset();
            setWorkoutType("");
            const dashboard = document.getElementById("Dashboard");
            dashboard?.scrollIntoView({ behavior: "smooth" });
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

                        <LoadingButton type="submit" className="w-full" loading={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Workout"}
                        </LoadingButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LogWorkoutForm;