'use client';

import React, { useState } from 'react';

import { mutate } from 'swr';
import { useForm } from 'react-hook-form';

import { Goal } from '@/db/types';
import { saveGoal } from '@/db/goals';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoalFormData, goalSchema } from '@/lib/schema';

import { toast } from '../ui/use-toast';

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

            await saveGoal(data);
            await mutate('user_goals');
            reset();
            toast({
                title: 'Goal added successfully'
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: 'Error updating user information',
                description: error.message,
                variant: 'destructive',
            });

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