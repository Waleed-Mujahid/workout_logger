import { WorkoutSessionsContext } from "@/context/WorkoutSessionsContext";
import { useContext } from "react";

const useUserWorkoutSessions = () => {
    const context = useContext(WorkoutSessionsContext);
    if (!context) {
        throw new Error("useUserWorkoutSessions must be used within a WorkoutSessionsProvider");
    }
    return context;
};


export default useUserWorkoutSessions;