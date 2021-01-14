import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getMovies: MoviesResponse;
  getPointMovie: MoviePointResponse;
};


export type MutationGetMoviesArgs = {
  options: MovieQuery;
};


export type MutationGetPointMovieArgs = {
  imdb_id: Scalars['String'];
};

export type MoviesResponse = {
  __typename?: 'MoviesResponse';
  error?: Maybe<Error>;
  movies?: Maybe<Array<Movie>>;
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  title: Scalars['String'];
  year: Scalars['String'];
  movie_id: Scalars['String'];
  poster: Scalars['String'];
};

export type MovieQuery = {
  name: Scalars['String'];
  page?: Maybe<Scalars['Float']>;
};

export type MoviePointResponse = {
  __typename?: 'MoviePointResponse';
  error?: Maybe<Error>;
  movie?: Maybe<MoviePoint>;
};

export type MoviePoint = {
  __typename?: 'MoviePoint';
  title: Scalars['String'];
  year: Scalars['String'];
  movie_id: Scalars['String'];
  poster: Scalars['String'];
  genre: Scalars['String'];
  rating: Scalars['String'];
  language: Scalars['String'];
  actors: Scalars['String'];
  plot: Scalars['String'];
};

export type GetPointMovieMutationVariables = Exact<{
  imdb_id: Scalars['String'];
}>;


export type GetPointMovieMutation = (
  { __typename?: 'Mutation' }
  & { getPointMovie: (
    { __typename?: 'MoviePointResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, movie?: Maybe<(
      { __typename?: 'MoviePoint' }
      & Pick<MoviePoint, 'title' | 'movie_id' | 'actors' | 'year' | 'rating' | 'language' | 'poster' | 'plot'>
    )> }
  ) }
);

export type GetMovieListingBySearchTermMutationVariables = Exact<{
  options: MovieQuery;
}>;


export type GetMovieListingBySearchTermMutation = (
  { __typename?: 'Mutation' }
  & { getMovies: (
    { __typename?: 'MoviesResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message'>
    )>, movies?: Maybe<Array<(
      { __typename?: 'Movie' }
      & Pick<Movie, 'title' | 'movie_id' | 'year' | 'poster'>
    )>> }
  ) }
);


export const GetPointMovieDocument = gql`
    mutation GetPointMovie($imdb_id: String!) {
  getPointMovie(imdb_id: $imdb_id) {
    error {
      message
    }
    movie {
      title
      movie_id
      actors
      year
      rating
      language
      poster
      plot
    }
  }
}
    `;

export function useGetPointMovieMutation() {
  return Urql.useMutation<GetPointMovieMutation, GetPointMovieMutationVariables>(GetPointMovieDocument);
};
export const GetMovieListingBySearchTermDocument = gql`
    mutation GetMovieListingBySearchTerm($options: MovieQuery!) {
  getMovies(options: $options) {
    error {
      message
    }
    movies {
      title
      movie_id
      year
      poster
    }
  }
}
    `;

export function useGetMovieListingBySearchTermMutation() {
  return Urql.useMutation<GetMovieListingBySearchTermMutation, GetMovieListingBySearchTermMutationVariables>(GetMovieListingBySearchTermDocument);
};