import Calendar from "@/components/Calendar";
import { DashboardSummary } from "@/components/DashboardSummary";
import ExerciseLibrary from "@/components/ExerciseLibrary/ExerciseLibrary";
import { Goals } from "@/components/Goals";
import { Header } from "@/components/Header";
import { LogWorkoutForm } from "@/components/LogWorkoutForm";
import { RecentWorkout } from "@/components/RecentWorkout";
import { WorkoutSessionsProvider } from "@/context/WorkoutSessionsContext";

export default function Home() {


  return (
    <WorkoutSessionsProvider>
      <Header />
      <DashboardSummary />
      <RecentWorkout />
      <ExerciseLibrary />
      <LogWorkoutForm />
      <Calendar />
      <Goals />
    </WorkoutSessionsProvider>
  );
}
