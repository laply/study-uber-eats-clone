import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Restaurant {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true })
  isVegan: Boolean;

  @Field(() => String, { nullable: true })
  Address: String

  @Field(() => String, { nullable: true })
  ownersName: String
}