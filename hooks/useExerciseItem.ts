import { useState, useEffect, useRef } from 'react';
import { Exercise } from '@/db/types';
import { MuscleGroup } from '@/lib/schema';
import useExerciseLibrary from '@/hooks/useExerciseLibrary';

interface UseExerciseItemProps {
    exercise: Exercise;
    onEdit: (exercise: Exercise) => void;
    showOptions?: boolean;
}

interface ExerciseOptions {
    value: string;
    label: string;
    muscleGroup: MuscleGroup;
}

const useExerciseItem = ({ exercise, onEdit, showOptions = false }: UseExerciseItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempExercise, setTempExercise] = useState<Exercise>(exercise);
    const [searchValue, setSearchValue] = useState<string>(exercise.name);
    const [selectedValue, setSelectedValue] = useState<string>(exercise.name);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup>(exercise.muscle_group);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const { exercises, loading } = showOptions ? useExerciseLibrary() : { exercises: [], loading: false };
    const inputRef = useRef<HTMLInputElement>(null);
    const autoCompleteRef = useRef<HTMLInputElement>(null);

    const exerciseOptions: ExerciseOptions[] = exercises.map((exercise) => ({
        value: exercise.name,
        label: exercise.name,
        muscleGroup: exercise.muscle_group,
    }));

    const filteredOptions = exerciseOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        if (filteredOptions.length === 0 && !loading) {
            inputRef.current?.focus();
        } else {
            autoCompleteRef.current?.focus();
        }
    }, [filteredOptions.length, loading]);

    const handleExerciseSelection = (selectedExercise: string) => {
        const matchedExercise = exerciseOptions.find(
            (exercise) => exercise.value === selectedExercise
        );

        if (matchedExercise) {
            setSelectedMuscleGroup(matchedExercise.muscleGroup);
        }
    };

    const handleFieldChange = (field: keyof Exercise) => (newValue: string) => {
        setTempExercise((prev) => ({
            ...prev,
            [field]: ['weight', 'sets', 'reps', 'duration', 'rest_time'].includes(field) ? parseFloat(newValue) : newValue
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!tempExercise.name.trim()) {
            newErrors.name = "Exercise name is required";
        }

        if (!selectedMuscleGroup) {
            newErrors.muscleGroup = "Muscle group is required";
        }

        if (tempExercise.sets !== undefined && (isNaN(tempExercise.sets) || tempExercise.sets <= 0)) {
            newErrors.sets = "Sets must be a positive number";
        }

        if (tempExercise.reps !== undefined && (isNaN(tempExercise.reps) || tempExercise.reps <= 0)) {
            newErrors.reps = "Reps must be a positive number";
        }

        if (tempExercise.weight !== undefined && (isNaN(tempExercise.weight) || tempExercise.weight < 0)) {
            newErrors.weight = "Weight must be a non-negative number";
        }

        if (tempExercise.duration !== undefined && (isNaN(tempExercise.duration) || tempExercise.duration <= 0)) {
            newErrors.duration = "Duration must be a positive number";
        }

        if (tempExercise.rest_time !== undefined && (isNaN(tempExercise.rest_time) || tempExercise.rest_time < 0)) {
            newErrors.rest_time = "Rest time must be a non-negative number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (validateForm()) {
            setIsEditing(false);
            await onEdit({ ...tempExercise, muscle_group: selectedMuscleGroup });
        }
    };

    return {
        isEditing,
        tempExercise,
        searchValue,
        selectedValue,
        selectedMuscleGroup,
        errors,
        loading,
        inputRef,
        autoCompleteRef,
        filteredOptions,
        setIsEditing,
        setSearchValue,
        setSelectedValue,
        setSelectedMuscleGroup,
        handleExerciseSelection,
        handleFieldChange,
        handleSave
    };
};

export default useExerciseItem;
