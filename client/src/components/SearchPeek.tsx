import { Box, Image, Stack } from '@chakra-ui/react'
import Link from 'next/link'

const Movie = ({ movie: { movie_id, poster, title, year } }) => {

  return <Link href={`/movie/${movie_id}`}><Stack direction="row" height="5rem" px="1rem"><Image src={poster} height="4rem" width="3rem" /><Box>{title}</Box> <Box>{year}</Box></Stack></Link>
}

export const SearchPeek = ({ movieList, is_visible }) => {
  if (!is_visible)
    return null

  return (
    <Box pt="1rem">
      { movieList.slice(0, 5).map((movie) => <Movie key={movie.movie_id} movie={movie} />)}
    </Box>
  )
}
