export const getMoviesFromLocalStorage = (): Array<string> => {
  const movies = localStorage.getItem('movie')
  const movie_arr = movies ? JSON.parse(movies) : []
  return movie_arr
}

export const setMovieInLocalStorage = (movie_id: string): boolean => {
  try {
    const movies = getMoviesFromLocalStorage()
    localStorage.setItem('movie', JSON.stringify([...movies, movie_id]))
  } catch (e) {
    return false
  }
  return true
}

export const removeMovieFromLocalStorage = (movie_id: string): void => {
  const movies = getMoviesFromLocalStorage();
  localStorage.setItem('movie', JSON.stringify(movies.filter(id => id !== movie_id)))
}