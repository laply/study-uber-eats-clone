import { Field, ObjectType } from "@nestjs/graphql"



@ObjectType()
export class OutputBase {
  @Field(() => String, { nullable: true })
  error?: string

  @Field(() => Boolean)
  success: boolean
}