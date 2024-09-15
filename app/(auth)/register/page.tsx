'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import FormButton from '@/components/shared/FormButton';
import { RegisterFormValues, RegisterSchema } from '@/lib/schema';
import RegisterFields from '@/components/RegisterFields';
import { signUp } from '@/db/auth';

function Register({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const errorMessage = searchParams?.error ? "An error occurred" : null
    const limitError = searchParams?.limit ? "Free emails limit reached. Use an SMTP provider for Supabase" : null

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema)
    });

    async function onSubmit(data: RegisterFormValues) {
        await signUp(data);
    }

    return (
        <>
            <h1 className="text-3xl text-primary self-center">Create an Account</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col p-4 space-y-2"
                >
                    <RegisterFields />
                    {errorMessage && <span className="text-destructive text-md self-center">{errorMessage}</span>}
                    {limitError && (<div className="text-destructive text-md self-center">{limitError}</div>)}
                    <br />
                    <FormButton buttonText="Register" />
                </form>
            </Form>
        </>
    );
}


export default Register;