'use client';
import React from 'react';
import useSWR from 'swr';
import GoalsCard from './GoalsCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AddGoal from './AddGoal';
import { getUserGoals } from '@/db/goals';
import { Goal } from '@/db/types';

interface GoalsData {
    goals: Goal[];
}
const Goals: React.FC = () => {
    const fetcher = async (): Promise<GoalsData> => {
        const response = await getUserGoals();
        if (response.error) {
            throw new Error(response.error.message); // Convert PostgrestError to Error
        }
        return { goals: response.data || [] };
    };

    const { data, error, isLoading } = useSWR<GoalsData, Error>('user_goals', fetcher);

    if (error) {
        return <div>Error fetching goals: {error.message}</div>;
    }

    const goals = data?.goals || [];

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Goals</CardTitle>
                <CardDescription>Track your fitness goals and progress.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {isLoading ? (
                    <div>Loading goals...</div>
                ) : (
                    <GoalsCard goals={goals} />
                )}
                <AddGoal />
            </CardContent>
        </Card>
    );
};

export default Goals;
