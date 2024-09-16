import { Button } from '@/components/ui/button';
import { FormDescription } from '@/components/ui/form';
import Link from 'next/link';

function FormButton({
    buttonText,
    formType,
}: {
    buttonText: string;
    formType: 'login' | 'register';
}) {
    return (
        <>
            <Button type="submit" className="w-full lg:w-1/2 py-2 px-4 mx-auto">
                {buttonText}
            </Button>
            <FormDescription className="text-center text-xs text-muted-foreground">
                {formType === 'login'
                    ? 'Don’t have an account?'
                    : 'Already have an account?'}{' '}
                <Link
                    href={formType === 'login' ? '/register' : '/login'}
                    className="text-destructive hover:underline"
                >
                    {formType === 'login' ? 'Register' : 'Login'}
                </Link>
            </FormDescription>
        </>
    );
}

export default FormButton;
