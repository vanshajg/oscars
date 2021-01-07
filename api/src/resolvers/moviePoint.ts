import { ObjectType, Field } from "type-graphql";
import { Error } from './Error'

@ObjectType()
class MoviePoint {
  @Field()
  title: string;
  @Field()
  year: string;
  @Field()
  movie_id: string;
  @Field()
  poster: string;
  @Field()
  genre: string;
  @Field()
  rating: string;
  @Field()
  language: string;
  @Field()
  actors: string;
  @Field()
  plot: string;
}

@ObjectType()
export class MoviePointResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;
  @Field(() => MoviePoint, { nullable: true })
  movie?: MoviePoint
}