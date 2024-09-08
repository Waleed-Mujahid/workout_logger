import { Exercise } from '@/lib/schema';

const ExerciseList = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
          <div className="flex-1">
            <div className="text-xl font-semibold text-gray-800">{exercise.name}</div>
            <div className="text-gray-700 mt-2">
              <span className="font-medium mr-3">Workout: </span>{exercise.reps} x {exercise.sets}
              {exercise.weight && <span>, {exercise.weight} kg</span>}
              {exercise.muscle_group && <span>, {exercise.muscle_group}</span>}
            </div>
            {exercise.notes && (
              <div className="mt-3 text-gray-600">
                <span className="font-semibold">Notes: </span>{exercise.notes}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const WorkoutLog = ({ exercises }: {
  exercises: Exercise[]
}) => (<div className="grid gap-4">
  {(exercises.length === 0) ?
    <div>No exercises logged</div> :
    <ExerciseList exercises={exercises} />}
</div>

);
