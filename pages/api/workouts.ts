import { WorkoutSession } from "@/lib/schema";

async function submitToAPI(workoutSession: WorkoutSession): Promise<void> {
  try {
    const response = await fetch(
      "https://api.your-workout-tracker.com/workouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you store the auth token in localStorage
        },
        body: JSON.stringify(workoutSession),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Workout session submitted successfully:", result);

    // You might want to update your local state or trigger a re-fetch of data here
    // For example:
    // updateLocalState(result);
    // or
    // refetchWorkoutSessions();
  } catch (error) {
    console.error("There was an error submitting the workout session:", error);
    // Handle the error appropriately
    // You might want to show an error message to the user
    // showErrorToUser('Failed to save workout. Please try again.');
  }
}

export default submitToAPI;
