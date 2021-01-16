import {
  Box,
  Input,
  Text, useColorMode
} from '@chakra-ui/react'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { NavigationBar } from '../components/NavigationBar'
import { SearchList } from '../components/SearchList'
import { SearchPeek } from '../components/SearchPeek'
import { useGetMovieListingBySearchTermMutation } from '../generated/graphql'

const Index = () => {
  const [movie_api_status, getMovieSearchListingMutation] = useGetMovieListingBySearchTermMutation();
  const [movie_list, setMovieList] = useState([]);
  const [is_list_open, setListStatus] = useState(false)
  const [search_term, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const onKeyDown = (event) => {
    if (event.key !== 'Enter')
      return;
    if (!is_list_open) {
      setListStatus(true)
    }
  }

  const onInputChange = (event: any): void => {
    setListStatus(false)
    setSearchTerm(event.target.value.trim())
    setPage(1)
  }

  useEffect(() => {
    getMovieSearchListingMutation({ options: { name: search_term } }).then(({ data, error }) => {
      if (error || !data || data.getMovies.error)
        setMovieList([])
      else
        setMovieList(data.getMovies.movies)
    })
  }, [search_term])

  useEffect(() => {
    if (page > 1) {
      getMovieSearchListingMutation({ options: { name: search_term, page } }).then(({ data, error }) => {
        if (error || !data || data.getMovies.error) {
          // setMovieList([])
        } else {
          setMovieList([...movie_list, ...data.getMovies.movies])
        }
      })
    }
  }, [page])

  const { colorMode } = useColorMode();
  return (
    <Container minHeight="100vh" px="1rem">
      <NavigationBar />
      <Box width="100%" mt="6rem" px={["1rem", "15rem"]}>
        <Text visibility={!is_list_open ? 'visible' : 'hidden'}>Press return↩  to search all</Text>
        <Input placeholder="Search for movie" fontSize="3xl" onKeyDown={debounce(onKeyDown, 500)}
          height={["4rem", "5rem"]} variant="filled" borderColor={colorMode === "dark" ? 'white' : 'black'} onChange={debounce(onInputChange, 500)}></Input>
        <SearchPeek movieList={movie_list} is_visible={!is_list_open} />
        <SearchList movie_list={movie_list} is_visible={is_list_open} searchTerm={search_term} />
      </Box>
    </Container>
  )
}


export default Index
