import { Exercise, WorkoutSession } from '@/db/types';
import ExerciseItem from '@/components/shared/ExerciseItem';

interface ExercisesContentProps {
    session: WorkoutSession;
    handleEditExercise: (sessionId: string, exercise: Exercise) => void;
    handleDeleteExercise: (sessionId: string, exerciseId: string) => void;
}

const ExercisesContent: React.FC<ExercisesContentProps> = ({ session, handleEditExercise, handleDeleteExercise }) => (
    <div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Exercises</h3>
        {session.exercises.length > 0 ? (
            <ul className="space-y-4">
                {session.exercises.map((exercise) => (
                    <ExerciseItem
                        key={exercise.id}
                        showOptions={true}
                        exercise={exercise}
                        onEdit={(updated_exercise) => {
                            handleEditExercise(session.id, updated_exercise);
                        }}
                        onDelete={() => {
                            handleDeleteExercise(session.id, exercise.id);
                        }}
                    />
                ))}
            </ul>
        ) : (
            <p>No exercises recorded for this session.</p>
        )}
    </div>
);

export default ExercisesContent;