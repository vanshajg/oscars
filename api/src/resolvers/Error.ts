import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Error {
  @Field(() => String, { nullable: true })
  message: string;
}
