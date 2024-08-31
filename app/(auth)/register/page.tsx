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
    searchParams: { message: string };
}) {

    const error = searchParams.message;

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: 'muhammadwaleed4943@gmail.com',
            name: 'waleed',
            password: 'Password@123',
            confirm_password: 'Password@123',
            height: 172,
            weight: 66,
        },
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
                    {error && <span className="text-destructive text-md self-center">{error}</span>} <br />
                    <FormButton buttonText="Register" />
                </form>
            </Form>
        </>
    );
}


export default Register;