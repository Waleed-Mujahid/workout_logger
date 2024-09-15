import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { WorkoutSession, WorkoutStats } from "@/lib/schema";
import { WorkoutSession as DbWorkoutSession, Exercise } from '@/db/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formattedDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
};

export function getEventColorScheme(eventType: string) {
  switch (eventType.toLowerCase()) {
    case 'traditional':
      return {
        color: '#3498db',          // Soft blue
        backgroundColor: '#e8f4fd',
        borderColor: '#3498db',
        textColor: '#2980b9'
      };
    case 'yoga':
      return {
        color: '#27ae60',          // Soft green
        backgroundColor: '#e9f7ef',
        borderColor: '#27ae60',
        textColor: '#219653'
      };
    case 'cardio':
      return {
        color: '#e74c3c',          // Soft red
        backgroundColor: '#fde9e7',
        borderColor: '#e74c3c',
        textColor: '#c0392b'
      };
    case 'hiit':
      return {
        color: '#f39c12',          // Soft orange
        backgroundColor: '#fef5e7',
        borderColor: '#f39c12',
        textColor: '#d35400'
      };
    default:
      return {
        color: '#9b59b6',          // Soft purple
        backgroundColor: '#f4ecf7',
        borderColor: '#9b59b6',
        textColor: '#8e44ad'
      };
  }
}

export const prepareNewSession = (data: WorkoutSession, id: string): DbWorkoutSession => {
  const newSession: DbWorkoutSession = {
    id,
    date: data.date,
    workout_type: data.workout.type,
    total_duration: data.total_duration,
    calories_burned: data.calories_burned,
    notes: data.notes,
    user_id: "",
    exercises: [],
  };

  switch (data.workout.type) {
    case 'yoga':
      newSession.yoga_style = data.workout.style;
      break;
    case 'hiit':
      newSession.HITT_rounds = data.workout.rounds;
      newSession.HITT_rest = data.workout.rest;
      newSession.exercises = data.workout.exercises as Exercise[];
      break;
    case 'traditional':
      newSession.exercises = data.workout.exercises as Exercise[];
      break;
    // For 'cardio' and other types, no extra fields are added.
  }

  return newSession;
};

const calculateTotalWeightLifted = (exercises: Exercise[]) => {
  return exercises.reduce((total, exercise) => {
    return total + (exercise.weight && exercise.sets && exercise.reps ? exercise.weight * exercise.sets * exercise.reps : 0);
  }, 0);
};

export const updateStats = async (
  mutate: (callback: (currentData: { stats: WorkoutStats | null; error: boolean } | undefined) => { stats: WorkoutStats; error: boolean }, shouldRevalidate: boolean) => void,
  data: DbWorkoutSession
) => {
  const totalWeightLifted = (data.workout_type !== 'cardio' && data.workout_type !== 'yoga')
    ? calculateTotalWeightLifted(data.exercises)
    : 0;

  // Optimistically update the stats
  mutate((currentData) => {
    const currentStats = currentData?.stats;

    if (!currentStats) {
      // Return the updated stats for a new workout session
      return {
        stats: {
          total_time_spent: data.total_duration,
          total_calories_burned: data.calories_burned,
          total_workouts: 1,
          total_weight_lifted: totalWeightLifted,
        },
        error: false,
      };
    }

    return {
      stats: {
        total_time_spent: currentStats.total_time_spent + data.total_duration,
        total_calories_burned: currentStats.total_calories_burned + data.calories_burned,
        total_workouts: currentStats.total_workouts + 1,
        total_weight_lifted: (currentStats.total_weight_lifted ?? 0) + totalWeightLifted,
      },
      error: false,
    };
  }, false);
};

export const optimisticUpdateSession = async (
  mutate: (callback: (sessions: DbWorkoutSession[] | null | undefined) => DbWorkoutSession[], shouldRevalidate: boolean) => void,
  newSession: DbWorkoutSession,
) => {
  mutate((sessions) => {
    if (!sessions) return [newSession];
    return [newSession, ...sessions];
  }, false);
};

export const calculateHeightInInches = (feet: string, inches: string): number => {
  const feetToInches = parseInt(feet || '0') * 12;
  const inchValue = parseInt(inches || '0');
  const totalInches = feetToInches + inchValue;

  return isNaN(totalInches) ? 0 : totalInches;
};
