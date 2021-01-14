import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { formatOmdbSearchData, getOmdbSearchData } from "../utils/obdbSearchListing";
import { formatOmdbPointData, getOmdbPointData } from '../utils/omdbPoint';
import { MoviePointResponse } from "./moviePoint";
import { MoviesResponse } from "./MoviesResponse";

@InputType()
class MovieQuery {
  @Field(() => String)
  name: string;
  @Field(() => Number, { nullable: true })
  page?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => MoviesResponse)
  async getMovies(
    @Arg("options") options: MovieQuery,
  ): Promise<MoviesResponse> {
    const data = await getOmdbSearchData({ s: options.name, page: options.page })
    return formatOmdbSearchData(data);
  }

  @Mutation(() => MoviePointResponse)
  async getPointMovie(@Arg("imdb_id") imdb_id: string): Promise<MoviePointResponse> {
    const data = await getOmdbPointData({ imdb_id })
    return formatOmdbPointData(data)
  }
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
