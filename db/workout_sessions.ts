'use server'
import { Exercise, WorkoutSession } from '@/db/types';
import { createClient } from "@/utils/supabase/server";
import { WorkoutSession as WorkoutSessionSchema } from "@/lib/schema";

import { getUserId } from "./user";

export const getUserWorkoutSessions = async (): Promise<{ sessions: WorkoutSession[] | null; error: boolean }> => {
    const supabase = createClient();
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("workout_sessions")
        .select(`
            id,
            date,
            workout_type,
            total_duration,
            calories_burned,
            notes,
            workout_exercises (
                exercise_id,
                user_exercises (
                    name,
                    muscle_group,
                    sets,
                    reps,
                    weight,
                    duration,
                    rest_time,
                    notes
                )
            )
        `)
        .eq("user_id", userId)
        .order("date", { ascending: false });

    if (error || !data || data.length === 0) {
        return { sessions: null, error: true };
    }

    const sessions = data.map((sessionData: any) => {
        const exercises = sessionData.workout_exercises.map((workoutExercise: any) => workoutExercise.user_exercises);
        return {
            id: sessionData.id,
            date: new Date(sessionData.date),
            workout_type: sessionData.workout_type,
            total_duration: sessionData.total_duration,
            calories_burned: sessionData.calories_burned,
            notes: sessionData.notes,
            user_id: userId,
            exercises: exercises as Exercise[],
        } as WorkoutSession;
    });

    return { sessions, error: false };
};

export async function saveWorkoutData(data: WorkoutSessionSchema) {
    const { date, workout, total_duration, calories_burned, notes } = data;
    const supabase = createClient();
    const user_id = await getUserId();
    const yoga_style = workout.type === 'yoga' ? workout.style : null;
    const HITT_rounds = workout.type === 'hiit' ? workout.rounds : null;
    const HITT_rest = workout.type === 'hiit' ? workout.rest : null;
    // Start a transaction
    const { data: workoutSessionData, error: workoutSessionError } = await supabase
        .from('workout_sessions')
        .insert({
            date,
            workout_type: workout.type,
            total_duration,
            calories_burned,
            notes,
            user_id,
            yoga_style,
            HITT_rounds,
            HITT_rest,
        })
        .select('id')
        .single();

    if (workoutSessionError || !workoutSessionData) {
        throw new Error(`Error inserting workout session: ${workoutSessionError.message}`);
    }

    const workoutSessionId = workoutSessionData.id;
    if (workout.type === 'cardio' || workout.type === 'yoga') {
        return;
    }

    for (const exercise of workout.exercises) {
        const { data: exerciseData, error: exerciseError } = await supabase
            .from('user_exercises')
            .insert({
                name: exercise.name,
                muscle_group: exercise.muscle_group,
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight,
                duration: exercise.duration,
                rest_time: exercise.rest_time,
                notes: exercise.notes,
            })
            .select('id')
            .single();

        if (exerciseError || !exerciseData) {
            throw new Error(`Error inserting exercise: ${exerciseError.message}`);
        }

        const exerciseId = exerciseData.id;

        const { error: workoutExercisesError } = await supabase
            .from('workout_exercises')
            .insert({
                workout_session_id: workoutSessionId,
                exercise_id: exerciseId,
            });

        if (workoutExercisesError) {
            throw new Error(`Error creating workout_exercises relationship: ${workoutExercisesError.message}`);
        }
    }
}
