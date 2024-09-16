'use server'

import { Exercise, WorkoutSession } from '@/db/types';
import { createClient } from "@/lib/utils/supabase/server";
import { Exercise as ExerciseSchema, WorkoutSession as WorkoutSessionSchema } from "@/lib/schema";

import { getUserId } from "./user";
export const getUserWorkoutSessions = async (): Promise<{ sessions: WorkoutSession[] | null; error: boolean }> => {
    const supabase = createClient();
    const userId = await getUserId();

    const { data, error } = await supabase
        .from('workout_sessions')
        .select(`
      id,
      date,
      workout_type,
      total_duration,
      calories_burned,
      notes,
      yoga_style,
      HITT_rounds,
      HITT_rest,
      user_exercises!fk_session_id (
        id,
        name,
        muscle_group,
        sets,
        reps,
        weight,
        duration,
        rest_time,
        notes
      )
    `)
        .eq('user_id', userId)
        .order('date', { ascending: false });


    if (error || !data || data.length === 0) {
        return { sessions: null, error: true };
    }

    const sessions = data.map((sessionData: any) => {
        const exercises = sessionData.user_exercises; // Directly access user_exercises

        return {
            id: sessionData.id,
            date: new Date(sessionData.date),
            workout_type: sessionData.workout_type,
            total_duration: sessionData.total_duration,
            calories_burned: sessionData.calories_burned,
            yoga_style: sessionData.yoga_style,
            HITT_rest: sessionData.HITT_rest,
            HITT_rounds: sessionData.HITT_rounds,
            notes: sessionData.notes,
            user_id: userId,
            exercises: exercises as Exercise[], // Assuming Exercise type is predefined
        } as WorkoutSession;
    });

    return { sessions, error: false };
};

export async function saveWorkoutSession(data: WorkoutSessionSchema, session_id: string) {
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
            id: session_id,
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
}

export async function saveExercises(exercises: ExerciseSchema[], session_id: string) {
    const supabase = createClient();

    for (const exercise of exercises) {
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
                session_id,
            })
            .select('id')
            .single();

        if (exerciseError || !exerciseData) {
            throw new Error(`Error inserting exercise: ${exerciseError.message}`);
        }
    }
}


export async function deleteWorkoutSession(sessionId: string) {
    const supabase = createClient();
    const { error } = await supabase
        .from('workout_sessions')
        .delete()
        .eq('id', sessionId);

    if (error) {
        throw new Error(`Error deleting workout session: ${error.message}`);
    }
}

export async function deleteExercise(sessionId: string, exerciseId: string) {
    const supabase = createClient();

    const { error } = await supabase.from('user_exercises').delete().eq('id', exerciseId);

    if (error) {
        throw new Error(`Error deleting exercise: ${error.message}`);
    }
}

export async function editExercise(sessionId: string, exercise: Exercise) {
    const supabase = createClient();

    const { error } = await supabase.from('user_exercises').update({
        name: exercise.name,
        muscle_group: exercise.muscle_group,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        duration: exercise.duration,
        rest_time: exercise.rest_time,
        notes: exercise.notes,
        session_id: sessionId
    }).eq('id', exercise.id);

    if (error) {
        throw new Error(`Error updating exercise: ${error.message}`);
    }
}

export async function updateWorkoutSession(session_id: string, data: WorkoutSession) {
    const supabase = createClient();
    const { date, workout_type, total_duration, calories_burned, notes, yoga_style, HITT_rounds, HITT_rest } = data;

    const { error } = await supabase.from('workout_sessions').update({
        date,
        workout_type,
        total_duration,
        calories_burned,
        notes,
        yoga_style,
        HITT_rounds,
        HITT_rest
    }).eq('id', session_id);

    if (error) {
        throw new Error(`Error updating workout session: ${error.message}`);
    }

}