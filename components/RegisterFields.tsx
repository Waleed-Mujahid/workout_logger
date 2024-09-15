import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { calculateHeightInInches } from '@/lib/utils';

function RegisterFields() {
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');

    const { setValue } = useFormContext();

    // Update height value when feet or inches change
    useEffect(() => {
        const totalHeightInInches = calculateHeightInInches(feet, inches);
        setValue('height', totalHeightInInches);  // Explicitly set the height in form state
    }, [feet, inches, setValue]);

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
                            Height
                        </FormLabel>
                        <div className="flex-1">
                            <div className="flex space-x-4">
                                <div>
                                    <FormLabel className="mb-2">Feet</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Feet"
                                            value={feet}
                                            onChange={(e) =>
                                                setFeet(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormLabel className="mb-2">Inches</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Inches"
                                            value={inches}
                                            onChange={(e) =>
                                                setInches(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </div>
                        {/* Hidden input to store calculated height */}
                        <input type="hidden" {...field} />
                    </FormItem>
                )}
            />
            <FormField
                name="weight"
                render={({ field, fieldState }) => (
                    <FormItem className="block md:flex items-center space-x-4">
                        <FormLabel className="w-1/4 md:pt-3 text-right">
                            Weight (Lbs)
                        </FormLabel>
                        <div className="flex-1">
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter your weight in pounds"
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
