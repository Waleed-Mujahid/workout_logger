'use client';
import { Goal } from '@/db/types';

import GoalItem from './GoalItem';

type GoalsCardProps = {
    goals: Goal[];
};

const   GoalsCard: React.FC<GoalsCardProps> = ({ goals }) => {
    if (goals.length === 0) {
        return <div>No goals available.</div>;
    }

    return (
        <>
            {goals.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
            ))}
        </>
    );
};

export default GoalsCard;
