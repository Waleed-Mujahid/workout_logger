import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExerciseList from './ExerciseList';
import { Exercise } from '@/lib/schema';
import { DumbbellIcon, LeafIcon, HandIcon, SendToBackIcon, ActivityIcon, HeartPulseIcon } from 'lucide-react';

const muscleGroups = [
    { name: 'Biceps', icon: DumbbellIcon },
    { name: 'Chest', icon: HeartPulseIcon },
    { name: 'Legs', icon: LeafIcon },
    { name: 'Shoulders', icon: HandIcon },
    { name: 'Back', icon: SendToBackIcon },
    { name: 'Abs', icon: ActivityIcon },
];

const MuscleGroupTabs: React.FC<{ exercises: Exercise[] | null; loading: boolean }> = ({ exercises, loading }) => {
    return (
        <Tabs defaultValue={muscleGroups[0].name.toLowerCase()}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 h-min lg:grid-cols-6">
                {muscleGroups.map((group) => (
                    <TabsTrigger key={group.name} value={group.name.toLowerCase()} className="p-3">
                        <group.icon className="w-5 h-5 mr-2" />
                        {group.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {muscleGroups.map((group) => (
                <TabsContent key={group.name} value={group.name.toLowerCase()}>
                    <ExerciseList muscleGroup={group.name} exercises={exercises} loading={loading} />
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default MuscleGroupTabs;
