import { checkForResolveTypeResolver } from "apollo-server-express";
import { Resolver, Query, Arg, Field, Ctx, InputType, Mutation } from "type-graphql";

import { MyContext } from '../types'
import { formatOmdbSearchData, getOmdbSearchData } from "../utils/obdbSearchListing";
import { formatOmdbPointData, getOmdbPointData } from '../utils/omdbPoint'
import { MoviePointResponse } from "./moviePoint";
import { MoviesResponse } from "./MoviesResponse";

@InputType()
class MovieQuery {
  @Field()
  name: string;
  @Field({ nullable: true })
  page?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => MoviesResponse)
  async getMovies(
    @Arg("options") options: MovieQuery,
    // @Ctx() { req, redis }: MyContext
  ): Promise<MoviesResponse> {
    const data = await getOmdbSearchData({ s: options.name, page: options.page })
    return formatOmdbSearchData(data);
  }

  @Mutation(() => MoviePointResponse)
  async getPointMovie(@Arg("imdb_id") imdb_id: string): Promise<MoviePointResponse> {
    console.log(imdb_id)
    const data = await getOmdbPointData({ imdb_id })
    return formatOmdbPointData(data)
  }

  // @Mutation(() => Boolean)
  // async voteMovie(
  //   @Arg("movie_id") movie_id: string,
  //   @Ctx() { req, redis }: MyContext
  // ): Promise<Boolean> {
  //   if (!req.session.identity) {
  //     req.session.identity = v4()
  //   }
  //   console.log(req.session.identity)
  //   return true
  // }

}
