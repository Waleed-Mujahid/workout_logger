import React from 'react';

import { Edit, X } from 'lucide-react';

import { Exercise } from '@/db/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useExerciseItem from '@/hooks/useExerciseItem';
import { AutoComplete } from '@/components/ui/autocomplete';
import { MuscleGroup, MuscleGroupEnum } from '@/lib/schema';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import EditableField from './EditableField';

interface ExerciseItemProps {
    exercise: Exercise;
    onDelete: (id: string) => void;
    onEdit: (exercise: Exercise) => void;
    showOptions?: boolean; // Optional boolean to control the display of buttons
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onDelete, onEdit, showOptions = false }) => {
    const {
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
    } = useExerciseItem({ exercise, onEdit, showOptions });

    return (
        <li className="p-6 rounded-lg shadow-lg flex items-start justify-between space-x-4">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-lg flex items-center w-full">
                        {isEditing ? (
                            <>
                                {filteredOptions.length === 0 && !loading ? (
                                    <Input
                                        ref={inputRef}
                                        placeholder="Enter custom exercise name"
                                        value={searchValue}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchValue(value);
                                            handleFieldChange('name')(value);
                                        }}
                                    />
                                ) : (
                                    <AutoComplete
                                        selectedValue={selectedValue}
                                        onSelectedValueChange={(value) => {
                                            setSelectedValue(value);
                                            handleFieldChange('name')(value);
                                            handleExerciseSelection(value);
                                        }}
                                        searchValue={searchValue}
                                        onSearchValueChange={(value) => {
                                            setSearchValue(value);
                                        }}
                                        items={filteredOptions}
                                        isLoading={loading}
                                        emptyMessage="No items found."
                                        placeholder="Search or enter custom exercise..."
                                        ref={autoCompleteRef}
                                    />
                                )}
                                <span className="text-gray-500 ml-4">
                                    <Select
                                        value={selectedMuscleGroup}
                                        onValueChange={(value) => {
                                            setSelectedMuscleGroup(value as MuscleGroup);
                                            handleFieldChange('muscle_group')(value);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <span>{selectedMuscleGroup || "Select muscle group"}</span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {MuscleGroupEnum.options.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </span>
                            </>
                        ) : (
                            <>
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 ml-2">({exercise.muscle_group})</span>
                            </>
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <div className="text-sm text-gray-600 space-y-4">
                        <EditableField
                            value={tempExercise.sets?.toString()}
                            onChange={handleFieldChange('sets')}
                            label='Sets'
                            type="number"
                            editable={isEditing}
                        />
                        <EditableField
                            value={tempExercise.reps?.toString()}
                            onChange={handleFieldChange('reps')}
                            label='Reps'
                            type="number"
                            editable={isEditing}
                        />
                        <EditableField
                            value={tempExercise.weight?.toString()}
                            onChange={handleFieldChange('weight')}
                            label='Weight'
                            type="number"
                            editable={isEditing}
                        />
                        <EditableField
                            value={tempExercise.duration?.toString()}
                            onChange={handleFieldChange('duration')}
                            label='Duration'
                            type="number"
                            editable={isEditing}
                        />
                        <EditableField
                            value={tempExercise.rest_time?.toString()}
                            onChange={handleFieldChange('rest_time')}
                            label='Rest Time'
                            type="number"
                            editable={isEditing}
                        />
                        <EditableField
                            value={tempExercise.notes}
                            onChange={handleFieldChange('notes')}
                            label='Notes'
                            editable={isEditing}
                        />
                        {Object.keys(errors).length > 0 && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    Please correct the following errors:
                                    <ul className="list-disc pl-5 mt-2">
                                        {Object.entries(errors).map(([field, error]) => (
                                            <li key={field}>{error}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="flex space-x-2">
                            <Button onClick={handleSave}>
                                Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)} variant="destructive">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-600">
                        {exercise.sets && exercise.reps && exercise.weight && (
                            <span className="font-medium">
                                {exercise.sets}x{exercise.reps} @ {exercise.weight}Lbs
                            </span>
                        )}
                        {exercise.duration && (
                            <span className="ml-2">
                                | {exercise.duration} min
                            </span>
                        )}
                        {exercise.rest_time && (
                            <span className="ml-2">
                                | Rest: {exercise.rest_time} min
                            </span>
                        )}
                    </div>
                )}
            </div>
            {showOptions && (
                <div className="flex items-center space-x-2">
                    {!isEditing && (
                        <button
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => onDelete(exercise.id)}
                            aria-label="Delete Exercise"
                        >
                            <X size={18} />
                        </button>
                    )}
                    <Button onClick={() => setIsEditing(true)} variant="link">
                        <Edit size={18} />
                    </Button>
                </div>
            )}
        </li>
    );
};

export default ExerciseItem;
