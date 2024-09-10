import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface LoginFieldsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;
}

function LoginFields({ errors }: LoginFieldsProps) {
    return (
        <>
            <FormField
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="example@example.com"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Password</FormLabel>
                            <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="********"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage>{errors.password?.message}</FormMessage>
                    </FormItem>
                )}
            />
            ``


        </>
    );
}

export default LoginFields;
