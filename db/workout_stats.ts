'use server'
import getUserId from "@/hooks/getUserId";
import { createClient } from "@/utils/supabase/server";

export const getUserStats = async () => {
    const supabase = createClient();
    const userId = await getUserId();

    const { data: stats, error } = await supabase
        .from("workout_stats")
        .select("*")
        .eq("user_id", userId);


    if (error) {
        return { error };
    }

    return { stats };
};