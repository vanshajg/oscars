import { Box, Text, Image, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'


const Movie = ({ movie }) => {
  const { title, poster, year, movie_id } = movie
  return (
    <Link href={`/movie/${movie_id}`}>
      <Box>
        <Image src={poster} fallbackSrc={"https://bit.ly/dan-abramov"} width={{ md: 60 }} alt={title} borderRadius="lg" />
        <Text fontWeight="bold">{title} ({year})</Text>
      </Box >
    </Link>
  )
}
export const SearchList = ({ movie_list }) => {
  const [movies, setMovies] = useState(movie_list)
  const [page, setPage] = useState(1)
  console.log("movies: ", movies)
  // implement infinite scroll here


  return (
    <SimpleGrid columns={[1, 4]} spacing="40px" mt="3rem">
      {movies.map((movie, index: number) => <Movie movie={movie} key={index} />)}
    </SimpleGrid>
  )
}