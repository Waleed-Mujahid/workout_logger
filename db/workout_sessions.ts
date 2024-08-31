'use server'
import getUserId from "@/hooks/getUserId";
import { WorkoutSession } from "@/lib/schema";
import { createClient } from "@/utils/supabase/server";


export async function saveWorkoutData(data: WorkoutSession) {
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
