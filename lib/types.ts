// types.ts
import { z } from 'zod';

export const WorkoutSessionSchema = z.object({
  id: z.string(),
  date: z.date(),
  workout: z.object({
    type: z.enum(['hiit', 'traditional', 'cardio', 'yoga']),
    rounds: z.number().optional(),
    duration: z.number().optional(),
    rest: z.number().optional(),
    sets: z.number().optional(),
    reps: z.number().optional(),
  }),
  totalDuration: z.number(),
  caloriesBurned: z.number(),
  notes: z.string().optional(),
});

export type WorkoutSession = z.infer<typeof WorkoutSessionSchema>;

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  rest_time?: number;
  notes?: string;
}
