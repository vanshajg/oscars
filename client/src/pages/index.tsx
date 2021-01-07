import {
  Box,
  Input,
  InputRightElement,
  useColorMode,
  Button,
  InputLeftAddon
} from '@chakra-ui/react'
import debounce from 'lodash/debounce'
import { useState } from 'react'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { SearchList } from '../components/SearchList'
import { SearchPeek } from '../components/SearchPeek'
import { useGetMovieListingBySearchTermMutation } from '../generated/graphql'

const Index = () => {
  const [movie_api_status, getMovieSearchListingMutation] = useGetMovieListingBySearchTermMutation();
  const [movie_list, setMovieList] = useState([]);
  const [is_list_open, setListStatus] = useState(false)

  const onInputChange = (event) => {
    if (is_list_open) {
      setListStatus(false)
    }
    getMovieSearchListingMutation({ options: { name: event.target.value.trim() } }).then(({ data }) => {
      if (data?.getMovies.movies) {
        console.log("complete")
        setMovieList(data.getMovies.movies)
      } else {
        setMovieList([])
      }
    }).catch(e => console.log(e))
  }

  const onKeyDown = (e) => {
    if (e.key !== 'Enter')
      return;

    if (!is_list_open) {
      setListStatus(true)
    }
  }


  const { colorMode } = useColorMode();
  return (
    <Container height="100vh" px="1rem">
      <DarkModeSwitch />
      <Box width="100%" mt="5rem" px={["1rem", "15rem"]}>
        <Input placeholder="Search for movie" fontSize="3xl" onKeyDown={onKeyDown}
          height={["4rem", "5rem"]} variant="filled" borderColor={colorMode === "dark" ? 'white' : 'black'} onChange={debounce(onInputChange, 500)}></Input>
        {is_list_open ? null : <SearchPeek movieList={movie_list} />}
        {is_list_open ? <SearchList movie_list={movie_list} /> : null}
      </Box>
      {movie_api_status.fetching ? "fetchingggg" : "bruh"}
    </Container>
  )
}


export default Index
