import { Skeleton } from "@/components/ui/skeleton";

const WorkoutDetailSkeleton: React.FC = () => (
    <div className="bg-card rounded-lg p-6 flex flex-col gap-2">
        <div className="text-sm font-medium w-2/3 text-muted-foreground">
            <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
        <div className="text-lg w-3/4 font-bold">
            <Skeleton className="h-6 w-full rounded-md" />
        </div>
    </div>

);

export default WorkoutDetailSkeleton;