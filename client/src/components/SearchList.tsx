import { Box, Button, createStandaloneToast, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useGetMovieListingBySearchTermMutation } from '../generated/graphql'
import { getMoviesFromLocalStorage, removeMovieFromLocalStorage, setMovieInLocalStorage } from '../utils/localstorageutils'
import { Movie } from './MovieShortCard'

const toast = createStandaloneToast()

export const SearchList = ({ movie_list, is_visible, searchTerm }: { movie_list: any, is_visible: boolean, searchTerm: string }) => {

  if (!is_visible)
    return null

  const [page, setPage] = useState(2)
  const [movie_api_status, getMovies] = useGetMovieListingBySearchTermMutation()
  const [movie_data, setMovieData] = useState([])
  const [nomination_list, setNomination] = useState([])

  useEffect(() => {
    setNomination(getMoviesFromLocalStorage())
  }, [])


  const toggleMovieNomination = (movie_id: string, reverse = false): void => {

    if (reverse) {
      removeMovieFromLocalStorage(movie_id)
      setNomination(nomination_list.filter(id => id !== movie_id))
      toast({
        title: "Movie removed from nomination",
        status: "info",
        duration: 1500,
        position: "top-right"
      })
      return;
    }

    if (nomination_list.length >= 5) {
      toast({
        title: "An error occured",
        description: "You cannot nominate more than 5 movies",
        status: "error",
        duration: 2000,
        position: "top-right"
      })
      return;
    }
    if (!setMovieInLocalStorage(movie_id)) {
      toast({
        title: "An error occured",
        description: "There is an error in saving nomination",
        status: "error",
        duration: 2000,
        position: "top-right"
      })
      return;
    }
    toast({
      title: "Movie nominated",
      status: "success",
      duration: 1000,
      position: "top-right"
    })
    setNomination([...nomination_list, movie_id])
  }

  useEffect(() => {
    getMovies({ options: { name: searchTerm, page } })
  }, [page])

  useEffect(() => {
    if (!movie_api_status.fetching && !movie_api_status.error && movie_api_status.data &&
      !movie_api_status.data.getMovies.error) {
      setMovieData([...movie_data, ...movie_api_status.data.getMovies.movies])
    }
  }, [movie_api_status])


  return (
    <Box>
      <SimpleGrid columns={[1, 1]} spacing="40px" mt="3rem" paddingX={{ md: "10 rem" }}>
        {[...movie_list, ...movie_data].map((movie, index: number) => <Movie movie={movie} key={index}
          is_nominated={nomination_list.some((nominated_id) => nominated_id === movie.movie_id)}
          toggleMovieNomination={toggleMovieNomination} />)}
      </SimpleGrid>
      <Button width={{ sm: "100%", md: "80%" }} isLoading={movie_api_status.fetching} onClick={() => setPage(page + 1)}>Load More!</Button>
    </Box>
  )
}