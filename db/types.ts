import { MuscleGroup, WorkoutEquipment } from "@/lib/schema";

export interface Exercises_library {
    id: string; // UUID
    name: string;
    muscle_group: MuscleGroup;
    equipment: WorkoutEquipment[]
    instructions: string;
}

export interface WorkoutSession {
    id: string;
    date: Date;
    workout_type: 'hiit' | 'traditional' | 'cardio' | 'yoga';
    total_duration: number;
    calories_burned: number;
    notes?: string;
    user_id: string;
    yoga_style?: string;
    HITT_rounds?: number;
    HITT_rest?: number;
    exercises: Exercise[];
}

export interface Goal {
    id: string;
    goal_name: string;
    progress: number;
    target: number;
    completion?: boolean;
}

export interface Exercise {
    id: string;
    name: string;
    muscle_group: MuscleGroup;
    weight?: number;
    sets?: number;
    reps?: number;
    duration?: number;
    rest_time?: number;
    notes?: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    data: WorkoutSession;
    start: Date;
    end: Date;
    color: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    exercises: Exercise[];
    editable: boolean;
    startEditable: boolean;
    durationEditable: boolean;
    resourceEditable: boolean;
    overlap: boolean;
    allDay: boolean;
}

export interface User {
    name: string;
    height: number;
    weight: number;
}