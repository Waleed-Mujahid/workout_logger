'use server'
import { DashboardSummary } from "@/components/DashboardSummary";
import ExerciseLibrary from "@/components/ExerciseLibrary/ExerciseLibrary";
import { Header } from "@/components/Header";
import { LogWorkoutForm } from "@/components/LogWorkoutForm";
import { RecentWorkout } from "@/components/RecentWorkout";
import useSearchBarExercises from "@/components/SearchBar";
import { WorkoutLog } from "@/components/WorkoutLog";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { exercises, error } = await useSearchBarExercises()

  return (
    <>
      <Header exercises={exercises} error={error} />
      <DashboardSummary />
      <div className="flex flex-col md:flex-row">
        <RecentWorkout />
        <WorkoutLog />
      </div>
      <ExerciseLibrary />
      <LogWorkoutForm />
    </>
  );
}
