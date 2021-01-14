import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class Movie {
  @Field(() => String)
  title: string;
  @Field(() => String)
  year: string;
  @Field(() => String)
  movie_id: string;
  @Field(() => String)
  poster: string;
}
