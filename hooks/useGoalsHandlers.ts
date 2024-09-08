import { useState, useRef, useEffect } from 'react';
import { Goal } from '@/db/types';
import { updateGoalProgress, deleteGoal } from '@/db/goals';
import { mutate } from 'swr';

export const useGoalHandlers = (goals: Goal[]) => {
    const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
    const [progressInput, setProgressInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = (goalId: string, currentProgress: number) => {
        setEditingGoalId(goalId);
        setProgressInput(currentProgress.toString());
    };

    const updateProgress = (goalId: string, progress: number) => {
        const currGoal = goals.find(goal => goal.id === goalId);
        if (!currGoal) {
            return;
        }
        const updatedGoal = { ...currGoal, progress };
        updateGoalProgress(goalId, updatedGoal);
    };

    const handleSaveClick = async (goalId: string) => {
        const newProgress = parseInt(progressInput, 10);
        setIsLoading(true);
        if (!isNaN(newProgress)) {
            updateProgress(goalId, newProgress);
            await mutate('user_goals');
        }
        setEditingGoalId(null);
        setIsLoading(false);
    };

    const handleDeleteClick = async (goalId: string) => {
        setIsLoading(true);
        await deleteGoal(goalId);
        await mutate('user_goals');
        setIsLoading(false);
    };

    useEffect(() => {
        if (editingGoalId !== null) {
            inputRef.current?.focus();
        }
    }, [editingGoalId]);

    return {
        isLoading,
        setIsLoading,
        editingGoalId,
        progressInput,
        inputRef,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        setProgressInput
    };
};
