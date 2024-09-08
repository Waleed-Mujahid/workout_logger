'use server'

import useSearchBarExercises from "./SearchBar"
import { SearchBarClient } from "./SearchBarClient"

async function SearchBarParent() {
    const { exercises, error } = await useSearchBarExercises()

    return (
        <SearchBarClient initialResults={exercises} initialError={error} />
    )
}

export default SearchBarParent