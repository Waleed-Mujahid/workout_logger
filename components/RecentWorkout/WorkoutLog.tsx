import { Exercise } from '@/lib/schema';
import ExerciseItem from '@/components/shared/ExerciseItem';


export const WorkoutLog = ({ exercises, ...props }: {
	exercises: Exercise[]
}) => (
	<div className="grid gap-4"  >
		{(
			exercises.length === 0) ?
			<div>No exercises logged</div> :
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{exercises.map((exercise, index) => (
					<>
						<ExerciseItem key={exercise.name} exercise={exercise} />
					</>
				))}
			</ul>
		}
	</div>
);
