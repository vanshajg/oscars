import { Box, Stack, Text, Image, Button } from '@chakra-ui/react'
import React from 'react';
import { useGetPointMovieMutation } from "../generated/graphql";
import { BsStarFill } from 'react-icons/bs'

const MovieExtraData = ({ movie_data }) => {
  const { plot, genre, actors, language, rating } = movie_data || {};
  return <Box mt="1rem">
    <Stack direction="row">{plot ? <Text mt="1rem" mb="1rem">{plot}</Text> : null}</Stack>
    <Stack direction="row" alignItems="center">{rating ? <><BsStarFill color="#C69320" /> <Text>{rating}</Text></> : null}</Stack>
    <Stack direction="row">{genre ? <><Text fontWeight="bold">Genre: </Text><Text>{genre}</Text></> : null}</Stack>
    <Stack direction="row">{actors ? <><Text fontWeight="bold">Starring:</Text><Text>{actors}</Text></> : null}</Stack>
    <Stack direction="row">{language ? <><Text fontWeight="bold">Language:</Text><Text>{language}</Text></> : null}</Stack>
  </Box>
}

export const Movie = ({ movie, is_nominated, toggleMovieNomination }) => {
  const { title, poster, year, movie_id } = movie
  const [movie_point_data, getMoviePointData] = useGetPointMovieMutation()


  //!TOFIX
  const image_url = poster !== 'N/A' ? poster : 'https://th.bing.com/th/id/OIP.GnocBEBZ943blocQI4YqkQHaF0'
  return (
    <Box p={4} display={{ md: "flex" }} border={{ md: "1px solid" }} borderRadius="10px" justifyContent="space-between" width="100%">
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
          <Button onClick={() => toggleMovieNomination(movie_id, is_nominated)}>{!is_nominated ? "Nominate!" : "Remove from Nomination"}</Button>
        </Stack>
        <MovieExtraData movie_data={movie_point_data.data?.getPointMovie.movie} />
      </Box>
    </Box >
  )
}