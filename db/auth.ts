'use server'
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginFormValues, RegisterFormValues } from '@/lib/schema';


export const signIn = async (formData: LoginFormValues) => {
    const { email, password } = formData
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect("/login?message=Invalid email or password");
    }

    return redirect("/");
};

export const signUp = async (formData: RegisterFormValues) => {
    const origin = headers().get("origin");
    const { email, password, name, height, weight } = formData;

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                name,
                height,
                weight,
            },
        },
    });

    if (error) {
        return redirect("/login?message=Could not create user");
    }

    return redirect("/login?message=Check email to continue sign in process");
};
