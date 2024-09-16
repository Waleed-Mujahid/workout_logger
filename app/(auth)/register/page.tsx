'use client';

import { useForm } from 'react-hook-form';

import { signUp } from '@/db/auth';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormButton from '@/components/shared/FormButton';
import RegisterFields from '@/components/RegisterFields';
import { RegisterFormValues, RegisterSchema } from '@/lib/schema';

function Register({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const errorMessage = searchParams?.error ? "An error occurred" : null;
    const limitError = searchParams?.limit
        ? "Free emails limit reached. Use an SMTP provider for Supabase"
        : null;

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema)
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    async function onSubmit(data: RegisterFormValues) {
        await signUp(data);
    }

    return (
        <>
            <h1 className="text-3xl text-primary self-center">Create an Account</h1>
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-4 space-y-2"
                >
                    <RegisterFields />
                    {errorMessage && (
                        <span className="text-destructive text-md self-center">
                            {errorMessage}
                        </span>
                    )}
                    {limitError && (
                        <div className="text-destructive text-md self-center">
                            {limitError}
                        </div>
                    )}
                    <br />
                    <FormButton buttonText={isSubmitting ? 'Pending...' : 'Register'} formType="register" />
                </form>
            </Form>
        </>
    );
}

export default Register;
