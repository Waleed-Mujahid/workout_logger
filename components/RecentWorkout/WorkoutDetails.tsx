const WorkoutDetail: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="bg-card rounded-lg p-4 flex flex-col gap-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-lg font-bold">{value}</div>
    </div>
);

export default WorkoutDetail;
