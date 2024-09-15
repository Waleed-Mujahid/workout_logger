'use server'
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ChangePasswordFormData, EditUserFormData, LoginFormValues, RegisterFormValues } from '@/lib/schema';


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
        if (error.code === "over_email_send_rate_limit") {

            redirect('/register?limit=true')
        }
        else {
            redirect('/register?error=true')
        }
    }

    return redirect("/login?message=Check email to continue sign in process");
};

export async function forgetPassword(formData: FormData) {
    const supabase = createClient()

    const email = formData.get('email') as string

    if (!email) {
        return redirect('/forgot-password?error=true')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
        console.error(error)
        redirect('/forgot-password?error=true')
    }

    redirect('/forgot-password?success=true')
}

export async function resetPassword(formData: FormData) {
    const supabase = createClient()
    const password = formData.get('password') as string

    const { error } = await supabase.auth.updateUser({ password: password })


    if (error) {
        console.error(error)
        redirect('/reset-password?error=true')
    }
}


export async function editUser(data: EditUserFormData) {
    const supabase = createClient()
    const { name, height, weight } = data

    const { error } = await supabase.auth.updateUser({
        data: {
            name,
            height,
            weight,
        },
    });

    if (error) {
        throw new Error('Error updating user data')
    }
}

export async function signOut() {
    const supabase = createClient();

    await supabase.auth.signOut();

    return redirect("/");
}

export async function passwordChange(data: ChangePasswordFormData) {
    const supabase = createClient();
    const { new_password, old_password } = data;
    const user = await supabase.auth.getUser()
    const useremail = user.data.user?.email as string

    const { error: err } = await supabase.auth.signInWithPassword({
        email: useremail,
        password: old_password,
    });

    if (err) {
        throw new Error('Invalid old password')
    }

    const { error } = await supabase.auth.updateUser({
        password: new_password,
    })

    if (error) {
        throw new Error('Error changing password')
    }
}