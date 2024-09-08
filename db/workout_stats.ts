'use server';
import getUserId from "@/hooks/getUserId";
import { WorkoutStats } from "@/lib/schema";
import { createClient } from "@/utils/supabase/server";

export const getWorkoutStats = async () => {
    const supabase = createClient();
    const userId = await getUserId();

    const { data: stats, error } = await supabase
        .from("workout_stats")
        .select("*")
        .eq("user_id", userId)
        .single(); // Assuming you want a single entry for the user

    if (error) {
        return { stats: null, error: true };
    }

    return { stats: stats as WorkoutStats, error: false };
};
