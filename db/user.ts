'use server'

import { createClient } from "@/utils/supabase/server";

export async function getUserId() {
    const supabase = createClient();
    const user = await supabase.auth.getUser()
    return user.data.user?.id
}
export async function getUserData() {
    const supabase = createClient();
    const user = await supabase.auth.getUser()
    const userData = user.data.user?.user_metadata

    if (!userData) {
        return null
    }

    return {
        name: userData.name as string,
        height: userData.height as number,
        weight: userData.weight as number,
    }
}