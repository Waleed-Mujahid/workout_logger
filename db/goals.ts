'use server'
import { GoalFormData } from "@/lib/schema";
import { createClient } from "@/lib/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

import { Goal } from "./types";
import { getUserId } from "./user";

interface GetUserGoalsResponse {
    data: Goal[] | null;
    error: PostgrestError | null; // Use PostgrestError instead of Error
}

export const getUserGoals = async (): Promise<GetUserGoalsResponse> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .order('created_at', { ascending: false })
        .returns<Goal[]>();

    return { data, error };
};

export async function updateGoalProgress(goal_id: string, goal: Goal) {
    const supabase = createClient();

    const { error } = await supabase
        .from("goals")
        .update(goal)
        .match({ id: goal_id });

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteGoal(goal_id: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from("goals")
        .delete()
        .match({ id: goal_id });

    if (error) {
        throw new Error(error.message);
    }
}

export async function saveGoal(goal: GoalFormData) {
    const user_id = await getUserId()
    const supabase = createClient();
    const completion = goal.progress === goal.target;

    const { error } = await supabase
        .from("goals")
        .insert([{ ...goal, user_id, completion }]);


    if (error) {
        throw new Error(error.message);
    }

}