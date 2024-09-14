import { z } from "zod";

// Custom refinement to parse and validate numbers
export const parseNumber = (value: unknown) => {
  if (value === undefined || value === null || value === "") {
    return undefined; // Return undefined to allow Zod to handle optional fields
  } else if (typeof value === "string" && !isNaN(Number(value))) {
    return Number(value);
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error("Invalid number");
  }
};

export const parseDate = (value: unknown): Date | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  // Check if the value is a valid type for the Date constructor
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const parsedDate = new Date(value);

    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  // Return undefined if the value is not a valid type for Date
  return undefined;
};


// Enum for workout types
const WorkoutTypeEnum = z.enum(["hiit", "traditional", "cardio", "yoga"]);

// Enum for muscle groups
export const MuscleGroupEnum = z.enum([
  "biceps",
  "chest",
  "legs",
  "shoulders",
  "back",
  "abs",
]);

export const WorkoutEquipmentEnum = z.enum([
  "dumbbells",
  "barbell",
  "kettlebell",
  "resistance bands",
  "bodyweight",
  "machines",
]);

// Schema for a single exercise
const ExerciseSchema = z.object({
  name: z.string(),
  muscle_group: MuscleGroupEnum,
  sets: z.preprocess(parseNumber, z.number().min(1).optional()),
  reps: z.preprocess(parseNumber, z.number().min(1).optional()),
  weight: z.preprocess(parseNumber, z.number().min(1).optional()),
  duration: z.preprocess(parseNumber, z.number().min(1).optional()), // in minutes
  rest_time: z.preprocess(parseNumber, z.number().min(1).optional()), // in seconds
  notes: z.string().optional(),
});

// Schema for HIIT workout
const HIITWorkoutSchema = z.object({
  type: z.literal(WorkoutTypeEnum.enum.hiit),
  rounds: z.preprocess(parseNumber, z.number().min(1)),
  rest: z.preprocess(parseNumber, z.number().min(1)), // in seconds
  exercises: z.array(ExerciseSchema),
});

// Schema for traditional workout
const TraditionalWorkoutSchema = z.object({
  type: z.literal(WorkoutTypeEnum.enum.traditional),
  exercises: z.array(ExerciseSchema),
});

// Schema for cardio workout
const CardioWorkoutSchema = z.object({
  type: z.literal(WorkoutTypeEnum.enum.cardio),
  distance: z.preprocess(parseNumber, z.number().min(1).optional()), // in kilometers or miles
});

// Schema for yoga workout
const YogaWorkoutSchema = z.object({
  type: z.literal(WorkoutTypeEnum.enum.yoga),
  style: z.string(), // e.g., "Vinyasa", "Hatha", etc.
});

// Union of all workout types
const WorkoutSchema = z.discriminatedUnion("type", [
  HIITWorkoutSchema,
  TraditionalWorkoutSchema,
  CardioWorkoutSchema,
  YogaWorkoutSchema,
]);


// Update the WorkoutSessionSchema
export const WorkoutSessionSchema = z.object({
  date: z.preprocess(parseDate, z.date()),
  workout: WorkoutSchema,
  total_duration: z.preprocess(parseNumber, z.number().min(1)), // in minutes
  calories_burned: z.preprocess(parseNumber, z.number().min(1)),
  notes: z.string().optional(),
});

// Update the UserProfileSchema
const UserProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  height: z.preprocess(parseNumber, z.number().min(1).optional()), // in cm
  weight: z.preprocess(parseNumber, z.number().min(1).optional()), // in kg
  goals: z.array(z.string()),
});

// Update the WorkoutStatsSchema
const WorkoutStatsSchema = z.object({
  total_workouts: z.preprocess(parseNumber, z.number().min(1)),
  total_time_spent: z.preprocess(parseNumber, z.number().min(1)), // in hours
  total_calories_burned: z.preprocess(parseNumber, z.number().min(1)),
  total_weight_lifted: z.preprocess(parseNumber, z.number().min(1).optional()), // in kg or lbs
});

// Main app data model
const WorkoutTrackerAppSchema = z.object({
  user: UserProfileSchema,
  workout_sessions: z.array(WorkoutSessionSchema),
  exercise_library: z.array(ExerciseSchema),
  stats: WorkoutStatsSchema,
});

// Register schema with custom refinements
export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(1, { message: "Name is required" }),
    height: z.preprocess(parseNumber, z.number().int().min(1, { message: "Height must be at least 1" })),
    weight: z.preprocess(parseNumber, z.number().int().min(1, { message: "Weight must be at least 1" })),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[@$!%*?&#]/, {
        message:
          "Password must contain at least one special character (@$!%*?&#)",
      }),
    confirm_password: z
      .string()
      .min(8, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });


export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const goalSchema = z.object({
  goal_name: z.string().min(1, "Goal name is required"),
  progress: z.number().min(1, "Progress must be at least 1"),
  target: z.number().min(1, "Target must be at least 1")
}).refine(data => data.progress <= data.target, {
  message: "Progress must be less than or equal to target",
  path: ["progress"]
});

export const ChangePasswordSchema = z.object({
  old_password: z.string(),
  new_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*?&#]/, {
      message:
        "Password must contain at least one special character (@$!%*?&#)",
    }),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
}
);

export const EditUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  height: z.number().int().min(1, { message: "Height is required" }),
  weight: z.number().int().min(1, { message: "Weight is required" }),
});


export type EditUserFormData = z.infer<typeof EditUserSchema>;
export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;
export type GoalFormData = z.infer<typeof goalSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type WorkoutTrackerApp = z.infer<typeof WorkoutTrackerAppSchema>;
export type WorkoutSession = z.infer<typeof WorkoutSessionSchema>;
export type WorkoutStats = z.infer<typeof WorkoutStatsSchema>;
export type MuscleGroup = z.infer<typeof MuscleGroupEnum>;
export type WorkoutEquipment = z.infer<typeof WorkoutEquipmentEnum>;