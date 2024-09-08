import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer';
import ExerciseDetail from './ExerciseDetail';
import { Exercises_library } from '@/db/types';

interface ResponsiveDetailWrapperProps {
    exercise: Exercises_library;
}

const ResponsiveDetailWrapper: React.FC<ResponsiveDetailWrapperProps> = ({ exercise }) => {
    const [open, setOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const triggerButton = (
        <Button variant="outline" className="w-full justify-start text-left font-normal px-4 py-2">
            {exercise.name}
        </Button>
    );

    return isDesktop ? (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{triggerButton}</SheetTrigger>
            <SheetContent className="p-6 space-y-4">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-semibold">Exercise Details</SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                        View detailed information about this exercise
                    </SheetDescription>
                </SheetHeader>
                <ExerciseDetail exercise={exercise} />
            </SheetContent>
        </Sheet>
    ) : (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
            <DrawerContent className="p-6 space-y-4">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl font-semibold">Exercise Details</DrawerTitle>
                    <DrawerDescription className="text-muted-foreground">
                        View detailed information about this exercise
                    </DrawerDescription>
                </DrawerHeader>
                <ExerciseDetail exercise={exercise} />
            </DrawerContent>
        </Drawer>
    );
};

export default ResponsiveDetailWrapper;
