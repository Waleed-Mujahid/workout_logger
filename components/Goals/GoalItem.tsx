'use client';

import { Goal } from '@/db/types';
import { Input } from '@/components/ui/input';
import { useGoalHandlers } from '@/hooks/useGoalsHandlers';

import GoalProgressBar from './GoalProgressBar';
import { Button } from '@/components/ui/button';

type GoalItemProps = {
    goal: Goal;
};

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
    const {
        isEditing,
        progressInput,
        inputRef,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        setProgressInput,
    } = useGoalHandlers(goal);

    const progressPercentage = Math.min((goal.progress / goal.target) * 100, 100);

    return (
        <div className="bg-card border border-muted rounded-lg p-4 flex flex-col gap-2 transition-all duration-300">
            <div className="text-lg font-bold text-foreground">{goal.goal_name}</div>
            <div className="flex items-center justify-between">
                {!isEditing ? (
                    <>
                        <div className="font-light text-muted-foreground">
                            <span className="font-semibold">Progress: </span>
                            {goal.progress} / {goal.target}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleEditClick(goal.progress)}
                                variant="secondary"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={handleDeleteClick}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Input
                            type="number"
                            value={progressInput}
                            onChange={(e) => setProgressInput(e.target.value)}
                            ref={inputRef}
                            className="w-20"
                        />
                        <Button onClick={handleSaveClick}>
                            Save
                        </Button>
                    </>
                )}
            </div>
            <GoalProgressBar
                progressPercentage={progressPercentage}
                completion={goal.completion}
            />
        </div>
    );
};

export default GoalItem;
