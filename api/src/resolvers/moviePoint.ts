import { ObjectType, Field } from "type-graphql";
import { Error } from './Error'

@ObjectType()
class MoviePoint {
  @Field(() => String)
  title: string;
  @Field(() => String)
  year: string;
  @Field(() => String)
  movie_id: string;
  @Field(() => String)
  poster: string;
  @Field(() => String)
  genre: string;
  @Field(() => String)
  rating: string;
  @Field(() => String)
  language: string;
  @Field(() => String)
  actors: string;
  @Field(() => String)
  plot: string;
}

@ObjectType()
export class MoviePointResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;
  @Field(() => MoviePoint, { nullable: true })
  movie?: MoviePoint
}