import React from 'react';

import { Calendar, Clipboard, Clock, Dumbbell, Flame } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useEventData from '@/hooks/useEventData';
import { ScrollArea } from '@/components/ui/scroll-area';
import ExerciseItem from '@/components/shared/ExerciseItem';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

interface ShowWorkoutSessionProps {
    event_id: string;
}

const ShowWorkoutSession: React.FC<ShowWorkoutSessionProps> = ({ event_id }) => {
    const { events } = useEventData();
    const session = events.find((event) => event.id === event_id)?.data;

    if (!session) return null;

    const isMobile = window.innerWidth < 640;

    const commonContent = (
        <>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                    <Calendar className="mr-2" size={18} />
                    {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                    <Clock className="mr-2" size={18} />
                    {session.total_duration} min
                </div>
                <div className="flex items-center">
                    <Flame className="mr-2" size={18} />
                    {session.calories_burned} cal
                </div>
                {session.notes && (
                    <div className="col-span-2 flex items-start">
                        <Clipboard className="mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-sm text-gray-600">{session.notes}</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-4">Exercises</h3>
                {session.exercises.length > 0 ? (
                    <ul className="space-y-4">
                        {session.exercises.map((exercise) => (
                            <ExerciseItem key={exercise.id} exercise={exercise} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No exercises available.</p>
                )}
            </div>
        </>
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
                </ScrollArea>
                <DrawerClose asChild>
                    <Button variant="secondary" className="mt-4">Close</Button>
                </DrawerClose>
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
                </ScrollArea>
                <DialogClose asChild>
                    <Button variant="secondary" className="mt-4">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );

    return content;
};

export default ShowWorkoutSession;
