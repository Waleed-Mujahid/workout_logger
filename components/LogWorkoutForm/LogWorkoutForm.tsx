'use client'

import React, { useState } from "react";

import { v4 as uuid } from "uuid";
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { getWorkoutStats } from "@/db/workout_stats";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/shared/LoadingButton";
import useUserWorkoutSessions from "@/hooks/useUserWorkoutSessions";
import { saveExercises, saveWorkoutSession } from "@/db/workout_sessions";
import { WorkoutSession as DbWorkoutSession, Exercise } from '@/db/types';
import { WorkoutSession, WorkoutSessionSchema, WorkoutStats } from "@/lib/schema";
import { optimisticUpdateSession, prepareNewSession, updateStats } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import HIITWorkoutForm from "./HIITWorkoutForm";
import YogaWorkoutForm from "./YogaWorkoutForm";
import CardioWorkoutForm from "./CardioWorkoutForm";
import WorkoutTypeSelector from "./WorkoutTypeSelector";
import CommonWorkoutFields from "./CommonWorkoutFields";
import TraditionalWorkoutForm from "./TraditionalWorkoutForm";

const initialWorkoutSession: WorkoutSession = {
    date: new Date(),
    workout: {
        type: "yoga",
        style: "",
    },
    total_duration: 0,
    calories_burned: 0,
    notes: "",
};

export const LogWorkoutForm: React.FC = () => {
    const [workoutType, setWorkoutType] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { mutate: sessionMutate } = useUserWorkoutSessions();
    const { mutate: statsMutate } = useSWR("workout_stats", getWorkoutStats);

    const form = useForm<WorkoutSession>({
        resolver: zodResolver(WorkoutSessionSchema),
        defaultValues: initialWorkoutSession,
    });

    const onSubmit = async (data: WorkoutSession) => {
        setError(null);
        setIsSubmitting(true);
        const id = uuid();
        const newSession = prepareNewSession(data, id);

        try {

            Promise.all([
                updateStats(statsMutate, newSession),
                optimisticUpdateSession(sessionMutate, newSession),
                saveWorkoutSession(data, id),
                (data.workout.type !== 'cardio' && data.workout.type !== 'yoga') ? saveExercises(data.workout.exercises as Exercise[], id) : Promise.resolve()
            ]);

            // Reset form and scroll to dashboard
            form.reset(initialWorkoutSession);
            document.getElementById("Dashboard")?.scrollIntoView({ behavior: "smooth" });
        } catch (err) {
            // Rollback optimistic UI update on error
            mutate("workout_stats");
            sessionMutate((sessions: DbWorkoutSession[] | null | undefined) => {
                if (!sessions) return [];
                return sessions.filter(session => session.id !== id);
            }, false);
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
                            Log Workout
                        </LoadingButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LogWorkoutForm;
