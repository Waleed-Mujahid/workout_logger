import { UseFormReturn } from 'react-hook-form';
import { Dumbbell, Edit, Trash } from 'lucide-react';

import useWindowSize from '@/hooks/useWindow';
import { Button } from '@/components/ui/button';
import { Exercise, WorkoutSession } from '@/db/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import ViewContent from './ViewContent';
import EditContent from './EditContent';
import ExercisesContent from './ExercisesContent';

interface ResponsiveContainerProps {
    session: WorkoutSession;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    form: UseFormReturn<WorkoutSession>;
    onSubmit: (data: WorkoutSession) => void;
    handleDelete: () => void;
    handleDeleteExercise: (sessionId: string, exerciseId: string) => void;
    handleEditExercise: (sessionId: string, exercise: Exercise) => void;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
    session,
    isEditing,
    setIsEditing,
    form,
    onSubmit,
    handleDelete,
    handleDeleteExercise,
    handleEditExercise,
}) => {
    const { width } = useWindowSize();
    const isMobile = width < 640;

    const commonContent = isEditing ? (
        <EditContent form={form} onSubmit={onSubmit} setIsEditing={setIsEditing} workoutType={session.workout_type} />
    ) : (
        <ViewContent session={session} />
    );

    const content = isMobile ? (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className='w-full text-[9px] h-min p-0' variant="link">
                    {session.workout_type}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md p-4 rounded-lg shadow-lg border border-gray-300">
                <DrawerTitle className="text-2xl font-bold mb-4 flex items-center">
                    <Dumbbell className="mr-3" size={24} />
                    {session.workout_type.charAt(0).toUpperCase() + session.workout_type.slice(1)}
                </DrawerTitle>
                <ScrollArea className="h-[400px] pr-4">
                    {commonContent}
                    <ExercisesContent
                        session={session}
                        handleEditExercise={handleEditExercise}
                        handleDeleteExercise={handleDeleteExercise}
                    />
                </ScrollArea>
                <div className="flex justify-end items-center gap-4 mt-6 sm:mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="flex gap-2 items-center px-4 py-2"
                    >
                        <Edit size={16} />
                        <span>Edit</span>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="flex gap-2 items-center px-4 py-2"
                    >
                        <Trash size={16} />
                        <span>Delete</span>
                    </Button>
                    <DrawerClose asChild>
                        <Button
                            variant="secondary"
                            className="flex gap-2 items-center px-4 py-2"
                        >
                            Close
                        </Button>
                    </DrawerClose>
                </div>
            </DrawerContent>
        </Drawer>
    ) : (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full text-sm h-min p-0' variant="link">
                    {session.workout_type}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg border border-gray-300">
                <DialogTitle className="text-2xl font-bold mb-4 flex items-center">
                    <Dumbbell className="mr-3" size={24} />
                    {session.workout_type.charAt(0).toUpperCase() + session.workout_type.slice(1)}
                </DialogTitle>
                <ScrollArea className="h-[500px] pr-4">
                    {commonContent}
                    <ExercisesContent
                        session={session}
                        handleEditExercise={handleEditExercise}
                        handleDeleteExercise={handleDeleteExercise}
                    />
                </ScrollArea>
                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6 sm:mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="flex gap-2 items-center px-4 py-2"
                    >
                        <Edit size={16} />
                        <span>Edit</span>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="flex gap-2 items-center px-4 py-2"
                    >
                        <Trash size={16} />
                        <span>Delete</span>
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            className="flex gap-2 items-center px-4 py-2"
                        >
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );

    return content;
};

export default ResponsiveContainer;