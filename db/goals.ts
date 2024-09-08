'use server'
import { Goal } from "./types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { GoalFormData } from "@/lib/schema";
import getUserId from "@/hooks/getUserId";

interface GetUserGoalsResponse {
    data: Goal[] | null;
    error: PostgrestError | null; // Use PostgrestError instead of Error
}

export const getUserGoals = async (): Promise<GetUserGoalsResponse> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .returns<Goal[]>()

    return { data, error };
};

export async function updateGoalProgress(goal_id: string, goal: Goal) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("goals")
        .update(goal)
        .match({ id: goal_id });

    if (error) {
        return { error };
    }

    return { data };

}

export async function deleteGoal(goal_id: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("goals")
        .delete()
        .match({ id: goal_id });

    if (error) {
        return { error };
    }

    return { data };
}

export async function saveGoal(goal: GoalFormData) {
    const user_id = await getUserId()
    const supabase = createClient();
    const completion = goal.progress === goal.target;

    const { data, error } = await supabase
        .from("goals")
        .insert([{ ...goal, user_id, completion }]);


    if (error) {
        return { error };
    }

    return { data };
}