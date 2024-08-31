import { SearchBarClient } from './SearchBarClient'

interface WgerExercise {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
}
interface ApiResponse {
  results: WgerExercise[];
}

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
}

async function fetchExercises(): Promise<SearchResult[]> {
  const response = await fetch('https://wger.de/api/v2/exercise/?language=2&limit=200', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }

  const data: ApiResponse = await response.json();

  return data.results.map((exercise) => ({
    id: exercise.id,
    title: exercise.name,
    description: exercise.description,
    category: exercise.category?.name || 'Unknown', // Default to 'Unknown' if category name is not available
  }));
}

export default async function useSearchBarExercises() {
  let exercises: SearchResult[] = [];
  let error: string | null = null;

  try {
    exercises = await fetchExercises();
  } catch (err) {
    console.error('Failed to fetch exercises:', err);
    error = 'Failed to load exercises';
  }


  return { exercises, error };
}