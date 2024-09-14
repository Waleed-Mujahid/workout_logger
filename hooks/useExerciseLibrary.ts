'use client'
import { ExerciseLibraryContext } from "@/context/ExerciseLibraryContext";
import { useContext } from "react";

const useExerciseLibrary = () => {
    const context = useContext(ExerciseLibraryContext);
    if (context === undefined) {
        throw new Error("useExerciseLibrary must be used within an ExerciseLibraryProvider");
    }
    return context;
};

export default useExerciseLibrary;