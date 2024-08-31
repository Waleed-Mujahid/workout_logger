import { Input } from '@/components/ui/input';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

function RegisterFields() {
    return (
        <>
            <FormField
                name="email"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Email
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                name="name"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Name
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                name="height"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Height (cm)
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter your height in cm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                name="weight"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Weight (kg)
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter your weight in kg"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                name="password"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Password
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                name="confirm_password"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Confirm Password
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                    </FormItem>
                )}
            />
        </>
    );
}

export default RegisterFields;
