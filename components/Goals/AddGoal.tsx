'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { goalSchema, GoalFormData } from '@/lib/schema';
import { saveGoal } from '@/db/goals';
import { mutate } from 'swr';
import { Goal } from '@/db/types';
import { Button } from '@/components/ui/button';

export default function AddGoal() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<GoalFormData>({
        resolver: zodResolver(goalSchema),
    });

    const onSubmit = async (data: GoalFormData) => {
        const optimisticGoal: Goal = {
            id: Date.now().toString(),
            goal_name: data.goal_name,
            progress: data.progress,
            target: data.target,
        };

        try {
            setIsLoading(true);

            mutate('user_goals', (currentData: { goals: Goal[] } | undefined) => {
                return {
                    goals: [...(currentData?.goals || []), optimisticGoal],
                };
            }, false);

            const { error } = await saveGoal(data);
            if (error) {
                throw new Error(error.message);
            }

            await mutate('user_goals');

            reset();
        } catch (error) {
            console.error('Error saving goal:', error);

            mutate('user_goals', (currentData: { goals: Goal[] } | undefined) => {
                return {
                    goals: currentData?.goals?.filter((goal) => goal.id !== optimisticGoal.id) || [],
                };
            }, false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-lg font-bold">Add New Goal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <Input
                        type="text"
                        placeholder="Enter goal name"
                        {...register('goal_name')}
                        className="mb-2"
                    />
                    {errors.goal_name && <span className="text-destructive text-sm">{errors.goal_name.message}</span>}
                </div>
                <div className="flex flex-col">
                    <Input
                        type="number"
                        placeholder="Enter progress"
                        {...register('progress', { valueAsNumber: true })}
                        className="mb-2"
                    />
                    {errors.progress && <span className="text-destructive text-sm">{errors.progress.message}</span>}
                </div>
                <div className="flex flex-col">
                    <Input
                        type="number"
                        placeholder="Enter target"
                        {...register('target', { valueAsNumber: true })}
                        className="mb-2"
                    />
                    {errors.target && <span className="text-destructive text-sm">{errors.target.message}</span>}
                </div>
                <Button className="col-span-3 mt-2" disabled={isLoading} type="submit">
                    Add Goal
                </Button>
            </form>
        </div>
    );
}