import axios from 'axios'
import { MoviesResponse } from '../resolvers/MoviesResponse'

interface omdbParams {
  i?: string; // imdb id
  s?: string; // search term
  type?: "movie" | "series" | "episode";
  page?: number;
}

interface omdbSearchMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

interface omdbSearchResp {
  data: {
    Search?: [omdbSearchMovie];
    totalResults?: string;
    Response: boolean;
    Error?: string;
  }
}

export const getOmdbSearchData = ({ s: search_term, type = "movie", page = 1 }: omdbParams): Promise<omdbSearchResp> => {
  const API_KEY = process.env.OMDB_KEY || 'ec24a15a'
  return axios.get(`http://www.omdbapi.com/?s=${search_term}&type=${type}&page=${page}&apikey=${API_KEY}`)
}


export const formatOmdbSearchData = (response: omdbSearchResp): MoviesResponse => {

  const data = response.data;

  if (data.Error) {
    return {
      error: { message: data.Error }
    }
  }

  if (!data.Search) {
    return {
      error: { message: "Something went wrong" }
    }
  }

  return {
    movies: data.Search.map(({ Title, Year, imdbID, Poster }) => ({
      title: Title,
      year: Year,
      movie_id: imdbID,
      poster: Poster,
    }))
  }

}