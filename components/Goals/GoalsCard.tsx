'use client';
import { Goal } from '@/db/types';
import { Input } from '@/components/ui/input'
import { useGoalHandlers } from '@/hooks/useGoalsHandlers';
import { Button } from "@/components/ui/button";
import LoadingButton from '@/components/shared/LoadingButton';



type GoalsCardProps = {
    goals: Goal[];
};

const GoalsCard: React.FC<GoalsCardProps> = ({ goals }) => {
    const {
        editingGoalId,
        progressInput,
        inputRef,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        setProgressInput,
        isLoading,
    } = useGoalHandlers(goals);

    if (goals.length === 0) {
        return <div>No goals available.</div>;
    }

    return (
        <>
            {goals.map((goal) => {
                const progressPercentage = Math.min((goal.progress / goal.target) * 100, 100);
                const isEditing = editingGoalId === goal.id;

                return (
                    <div
                        key={goal.id}
                        className="bg-card border border-muted rounded-lg p-4 flex flex-col gap-2 transition-all duration-300"
                    >
                        <div className="text-lg font-bold text-foreground">{goal.goal_name}</div>

                        <div className="flex items-center justify-between">
                            {!isEditing ? (
                                <>
                                    <div className="font-light text-muted-foreground">
                                        <span className='font-semibold'>Progress: </span>
                                        {goal.progress} / {goal.target}
                                    </div>
                                    <div className='flex gap-2'>
                                        <Button
                                            onClick={() => {
                                                handleEditClick(goal.id, goal.progress);
                                            }}
                                            variant={'secondary'}
                                        >
                                            Edit
                                        </Button>
                                        <LoadingButton
                                            loading={isLoading}
                                            onClick={() => { handleDeleteClick(goal.id) }}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Delete
                                        </LoadingButton>
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
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={() => { handleSaveClick(goal.id); }}
                                    >
                                        Save
                                    </LoadingButton>
                                </>
                            )}
                        </div>

                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${goal.completion ? 'bg-primary' : 'bg-muted-foreground'}`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default GoalsCard;
