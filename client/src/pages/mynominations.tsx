import {
  Box, createStandaloneToast, Spinner, Text
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { NavigationBar } from '../components/NavigationBar'
import { Movie } from '../components/MovieShortCard'
import { useGetPointMovieMutation } from '../generated/graphql'
import { getMoviesFromLocalStorage, removeMovieFromLocalStorage } from '../utils/localstorageutils'

const toast = createStandaloneToast()

const MyNominations = () => {
  const [movie_data, setMovieData] = useState([])
  const [movie_api_status, getPointMovieData] = useGetPointMovieMutation()
  useEffect(() => {
    const nominated_movies = getMoviesFromLocalStorage()
    nominated_movies.forEach((movie_id) => {
      getPointMovieData({ imdb_id: movie_id }).then(({ data }) => {
        setMovieData((movie_data) => [...movie_data, data.getPointMovie.movie])
      })
    })
  }, [])

  const removeNomination = (imdb_id: string) => {
    removeMovieFromLocalStorage(imdb_id)
    toast({
      title: "Movie removed from nomination",
      status: "info",
      duration: 1500,
      position: "top-right"
    })
    setMovieData(movie_data => movie_data.filter((data) => data.movie_id !== imdb_id))
  }


  const MovieData = () => {
    if (movie_api_status.fetching)
      return (
        <Box textAlign="center" pt="40vh">
          <Spinner size="xl" speed="0.9s" />
          <Text fontSize={["20px", "32px"]}>Loading your movies, Please wait...</Text>
        </Box>
      )

    if (!movie_data.length) {
      return (
        <Box textAlign="center" pt="40vh">
          <Text fontSize="3xl">You don't have any nominations! Go to <Link href="/"><Text color="teal.500" display="inline" as="button">home</Text></Link>  to nominate</Text>
        </Box>
      )
    }

    return (
      <>{movie_data.map((data) => <Box mb="2rem" width="100%" key={data.movie_id}><Movie movie={data} is_nominated={true} toggleMovieNomination={removeNomination} /></Box>)} </>
    )
  }

  return (
    <Container minHeight="100vh" px={{ sm: "1rem", md: "16rem" }}>
      <NavigationBar />
      <Box pt="6rem" width="100%">
        <MovieData />
      </Box>
    </Container >
  )
}


export default MyNominations
