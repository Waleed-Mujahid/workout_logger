'use server'
import { createClient } from "@/utils/supabase/server";

export default async function getUserId() {
    const supabase = createClient();
    const user = await supabase.auth.getUser()
    return user.data.user?.id
}
