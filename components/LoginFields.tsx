import { Input } from '@/components/ui/input';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

function LoginFields({ errors }: { errors: any }) {
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
                        <FormLabel>Password</FormLabel>
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
        </>
    );
}

export default LoginFields;
