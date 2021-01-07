import { ObjectType, Field } from "type-graphql";
import { Movie } from "./movieObj";
import { Error } from "./Error";


@ObjectType()
export class MoviesResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;
  @Field(() => [Movie], { nullable: true })
  movies?: Movie[];
}
