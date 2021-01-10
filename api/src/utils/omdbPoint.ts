import axios from "axios"
import { MoviePointResponse } from '../resolvers/moviePoint'

interface omdbPointResp {
  data: {
    Title?: string;
    Year?: string;
    Genre?: string;
    Actors?: string;
    imdbRating?: string;
    imdbID?: string;
    Response: string;
    Error?: string;
    Poster?: string;
    Language?: string;
    Plot?: string;
  }
}

export const getOmdbPointData = ({ imdb_id }: { imdb_id: string }): Promise<omdbPointResp> => {
  const API_KEY = process.env.OMDB_KEY
  return axios.get(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${API_KEY}`)
}


export const formatOmdbPointData = (response: omdbPointResp): MoviePointResponse => {
  const data = response.data;
  if (data.Error) {
    return {
      error: { message: data.Error }
    }
  }

  if (data.Response.toLowerCase() === 'false') {
    return {
      error: { message: "something went wrong" }
    }
  }

  // not cool
  if (!data.Title || !data.Year || !data.imdbRating || !data.Poster || !data.Genre || !data.imdbRating ||
    !data.Language || !data.Actors || !data.imdbID || !data.Plot)
    return {
      error: { message: "something went wrong" }
    }

  return {
    movie: {
      title: data.Title,
      year: data.Year,
      movie_id: data.imdbID,
      poster: data.Poster,
      genre: data.Genre,
      rating: data.imdbRating,
      language: data.Language,
      actors: data.Actors,
      plot: data.Plot
    }
  }

}