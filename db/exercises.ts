'use server'
import { createClient } from "@/utils/supabase/server";

export const getExercises = async () => {
    const supabase = createClient();

    const { data: stats, error } = await supabase
        .from("exercises")
        .select("*")


    if (error) {
        return { error };
    }

    return { stats };
};