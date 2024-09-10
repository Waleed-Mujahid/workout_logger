type GoalProgressBarProps = {
    progressPercentage: number;
    completion: boolean | undefined;
};

const GoalProgressBar: React.FC<GoalProgressBarProps> = ({ progressPercentage, completion }) => {
    return (
        <div className="w-full bg-muted rounded-full h-2">
            <div
                className={`h-2 rounded-full transition-all duration-300 ${completion ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                style={{ width: `${progressPercentage}%` }}
            />
        </div>
    );
};

export default GoalProgressBar;
