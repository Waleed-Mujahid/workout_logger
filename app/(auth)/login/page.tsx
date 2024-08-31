'use client'
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';


import { signIn } from '@/db/auth';
import LoginFields from '@/components/LoginFields';
import FormButton from '@/components/shared/FormButton';
import { LoginFormValues, LoginSchema } from '@/lib/schema';


export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const error = searchParams.message;

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const {
        handleSubmit,
        formState: { errors },
    } = form;


    async function onSubmit(data: LoginFormValues) {
        await signIn(data);
    }

    return (
        <>
            <h1 className="text-3xl text-primary self-center">Login</h1>
            <Form {...form}>
                <form
                    className="flex flex-col p-4 mt-2 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <LoginFields errors={errors} />
                    {error && <span className="text-destructive text-md self-center">{error}</span>} <br />
                    <FormButton buttonText="Login" />
                </form>
            </Form>
        </>
    );
}
