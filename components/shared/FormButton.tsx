import { Button } from '@/components/ui/button';
import { FormDescription } from '@/components/ui/form';
import Link from 'next/link';

function FormButton({
    buttonText,
}: {
    buttonText: string;
}) {
    return (
        <>
            <Button
                type="submit"
                className="w-full lg:w-1/2 py-2 px-4 mx-auto"
            >
                {buttonText}
            </Button>
            <FormDescription className="text-center text-xs text-muted-foreground">
                {buttonText === 'Login'
                    ? 'Don’t have an account?'
                    : 'Already have an account?'}{' '}
                <Link
                    href={buttonText === 'Login' ? '/register' : '/login'}
                    className="text-destructive  hover:underline"
                >
                    {buttonText === 'Login' ? 'Register' : 'Login'}
                </Link>
            </FormDescription>
        </>
    );
}

export default FormButton;