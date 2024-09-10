import { useEffect, useRef, useState } from 'react';

import { mutate } from 'swr';

import { Goal } from '@/db/types';
import { toast } from '@/components/ui/use-toast';
import { deleteGoal, updateGoalProgress } from '@/db/goals';

export const useGoalHandlers = (goal: Goal) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [progressInput, setProgressInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = (currentProgress: number) => {
        setIsEditing(true);
        setProgressInput(currentProgress.toString());
    };

    const handleSaveClick = async () => {
        const newProgress = parseInt(progressInput, 10);
        if (isNaN(newProgress)) return;

        const updatedGoal: Goal = {
            ...goal,
            progress: newProgress,
        };

        // Optimistic update
        mutate('user_goals', (currentData: { goals: Goal[] } | undefined) => {
            return {
                goals: currentData?.goals.map((g) =>
                    g.id === goal.id ? updatedGoal : g
                ) || [],
            };
        }, false);

        try {
            setIsEditing(false);
            await updateGoalProgress(goal.id, updatedGoal);
            await mutate('user_goals'); // Revalidate with server data
            toast({
                title: 'Goal progress updated successfully',
            });
        } catch (error: any) {
            toast({
                title: 'Error updating goal',
                description: error.message,
                variant: 'destructive',
            });
            mutate('user_goals'); // Rollback in case of error
        }
    };

    const handleDeleteClick = async () => {
        mutate('user_goals', (currentData: { goals: Goal[] } | undefined) => {
            return {
                goals: currentData?.goals.filter((g) => g.id !== goal.id) || [],
            };
        }, false);

        try {
            await deleteGoal(goal.id);
            await mutate('user_goals'); // Revalidate with server data
            toast({
                title: 'Goal deleted successfully',
            });
        } catch (error: any) {
            toast({
                title: 'Error deleting goal',
                description: error.message,
                variant: 'destructive',
            });
            mutate('user_goals'); // Rollback in case of error
        }
    };

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    return {
        isEditing,
        progressInput,
        inputRef,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        setProgressInput,
    };
};
