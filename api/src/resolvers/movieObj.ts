import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class Movie {
  @Field()
  title: string;
  @Field()
  year: string;
  @Field()
  movie_id: string;
  @Field()
  poster: string;
}
