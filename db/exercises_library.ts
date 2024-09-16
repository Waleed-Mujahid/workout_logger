'use server'
import { createClient } from "@/lib/utils/supabase/server";

export const getUserExercises = async () => {
    const supabase = createClient();

    const { data: stats, error } = await supabase
        .from("exercises_library")
        .select("*")


    if (error) {
        return { error };
    }

    return { stats };
};