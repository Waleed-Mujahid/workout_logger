import { WorkoutSession } from "@/lib/schema";

export async function submitWorkout(
  workoutSession: WorkoutSession
): Promise<void> {
  const response = await fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutSession),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit workout");
  }

  const result = await response.json();
  console.log("Workout session submitted successfully:", result);

  // You might want to update your local state or trigger a re-fetch of data here
  // For example:
  // updateLocalState(result);
  // or
  // await mutate('/api/workouts')  // If using SWR for data fetching
}
