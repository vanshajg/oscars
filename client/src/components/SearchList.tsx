import { Box, Button, SimpleGrid, Stack, Image, Text } from '@chakra-ui/react'
// import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useGetMovieListingBySearchTermMutation, useGetPointMovieMutation } from '../generated/graphql'

const MovieExtraData = ({ movie_data }) => {
  const { plot, genre, actors, language } = movie_data || {};
  return <Box mt="1rem">
    <Stack direction="row">{plot ? <Text mt="1rem" mb="1rem">{plot}</Text> : null}</Stack>
    <Stack direction="row">{genre ? <><Text fontWeight="bold">Genre: </Text><Text>{genre}</Text></> : null}</Stack>
    <Stack direction="row">{actors ? <><Text fontWeight="bold">Starring:</Text><Text>{actors}</Text></> : null}</Stack>
    <Stack direction="row">{language ? <><Text fontWeight="bold">Language:</Text><Text>{language}</Text></> : null}</Stack>
  </Box>
}

const Movie = ({ movie }) => {
  const { title, poster, year, movie_id } = movie
  const [movie_point_data, getMoviePointData] = useGetPointMovieMutation()

  const image_url = poster !== 'N/A' ? poster : 'https://th.bing.com/th/id/OIP.GnocBEBZ943blocQI4YqkQHaF0'
  return (
    <Box p={4} display={{ md: "flex" }} border={{ md: "1px solid" }} borderRadius="10px" justifyContent="space-between">
      <Box flexShrink={0}>
        <Image
          borderRadius="lg"
          src={image_url}
          alt={title}
          display="unset"
          width={{ md: "60" }}
        />
      </Box>
      <Box mt={{ base: 4, md: 0 }} width={{ md: "50%" }}>
        <Text fontWeight="bold" fontSize="3xl">
          {title} ({year})
        </Text>
        <Stack direction="row" justify={{ sm: "center", md: "start" }} mt="1rem">
          <Button onClick={() => getMoviePointData({ imdb_id: movie_id })}
            isLoading={movie_point_data.fetching} disabled={!!movie_point_data.data?.getPointMovie}>
            More Info
          </Button>
          <Button>Nominate!</Button>
        </Stack>
        <MovieExtraData movie_data={movie_point_data.data?.getPointMovie.movie} />
      </Box>
    </Box >
  )
}
export const SearchList = ({ movie_list, is_visible, searchTerm }: { movie_list: any, is_visible: boolean, searchTerm: string }) => {

  if (!is_visible)
    return null

  const [page, setPage] = useState(2)
  const [movie_api_status, getMovies] = useGetMovieListingBySearchTermMutation()
  const [movie_data, setMovieData] = useState([])

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
        {[...movie_list, ...movie_data].map((movie, index: number) => <Movie movie={movie} key={index} />)}
      </SimpleGrid>
      <Button width={{ sm: "100%", md: "80%" }} isLoading={movie_api_status.fetching} onClick={() => setPage(page + 1)}>Load More!</Button>
    </Box>
  )
}