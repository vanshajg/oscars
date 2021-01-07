import { Container } from '../../components/Container'
import { useRouter } from 'next/router'
import { DarkModeSwitch } from '../../components/DarkModeSwitch'
import { Box, Spinner, Text, Image, Link, Stack } from '@chakra-ui/react'
import { useGetPointMovieMutation } from '../../generated/graphql'
import { useEffect } from 'react'
import { StarRating } from '../../components/StarRating'

import { FaLanguage, FaRegFileAlt, FaUserFriends, FaTags } from 'react-icons/fa'


const MoviePage = () => {

  const router = useRouter()
  const [data, getMovieData] = useGetPointMovieMutation()
  useEffect(() => {
    if (router.query && router.query.movie_id) {
      getMovieData({ imdb_id: router.query.movie_id })
    }
  }, [router])

  const MovieData = () => {
    if (!data || data.fetching || !data.data) {
      return (
        <Box textAlign="center" pt="40vh">
          <Spinner size="xl" speed="0.9s" />
          <Text fontSize={["20px", "32px"]}>Loading movie, Please wait...</Text>
        </Box>
      )
    }
    else {
      const { title, year, movie_id, poster, genre, rating, language, actors, plot } =
        data.data.getPointMovie.movie;
      return (
        <Box p={4} display={{ md: "flex" }} mt={["3rem", "10rem"]}>
          <Box flexShrink={0} textAlign="center">
            <Image
              borderRadius="lg"
              width={{ md: 60 }}
              src={poster}
              alt={title}
              display="unset"
            />
          </Box>
          <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="3xl"
              letterSpacing="wide"
              color="teal.600"
            >
              {title} ({year})
            </Text>
            <StarRating starcount={rating} />
            <Stack direction="row">{plot ? <Text mt="1rem" mb="1rem">{plot}</Text> : null}</Stack>
            <Stack direction="row">{genre ? <><Text fontWeight="bold">Genre: </Text><Text>{genre}</Text></> : null}</Stack>
            <Stack direction="row">{actors ? <><Text fontWeight="bold">Starring:</Text><Text>{actors}</Text></> : null}</Stack>
            <Stack direction="row">{language ? <><Text fontWeight="bold">Language:</Text><Text>{language}</Text></> : null}</Stack>
          </Box>
        </Box>
      )
    }
  }


  return (
    <Container height="100vh" px="1rem">
      <MovieData />
      <DarkModeSwitch />
    </Container>
  )
}

export default MoviePage
