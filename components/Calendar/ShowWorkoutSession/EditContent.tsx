import { Save } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { WorkoutSession } from '@/db/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface EditContentProps {
    form: UseFormReturn<WorkoutSession>;
    onSubmit: (data: WorkoutSession) => void;
    setIsEditing: (isEditing: boolean) => void;
    workoutType: string;
}

const EditContent: React.FC<EditContentProps> = ({ form, onSubmit, setIsEditing, workoutType }) => (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                            <Input
                                type="datetime-local"
                                {...field}
                                value={field.value instanceof Date ? field.value.toISOString().slice(0, 16) : field.value}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                            />
                        </FormControl>
                        {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="total_duration"
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel>Total Duration (min)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="calories_burned"
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel>Calories Burned</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="notes"
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Add any notes about your workout" />
                        </FormControl>
                        {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                    </FormItem>
                )}
            />
            {workoutType === 'yoga' && (
                <FormField
                    control={form.control}
                    name="yoga_style"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Yoga Style</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                        </FormItem>
                    )}
                />
            )}
            {workoutType === 'hiit' && (
                <>
                    <FormField
                        control={form.control}
                        name="HITT_rounds"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>HITT Rounds</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="HITT_rest"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>HITT Rest (min)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                {fieldState.error && <FormMessage className="text-destructive">{fieldState.error.message}</FormMessage>}
                            </FormItem>
                        )}
                    />
                </>
            )}
            <div className="flex justify-end items-center gap-4 mt-6 sm:mt-4">
                <Button type="submit" className="flex gap-2 items-center">
                    <Save size={16} />
                    <span>Save</span>
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
            </div>
        </form>
    </Form >
);

export default EditContent;