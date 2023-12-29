import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { OutputBase } from "./output.dto";


@InputType()
export class loginInput extends PickType(
  User, ["email", "password"], InputType
) { }

@ObjectType()
export class loginOutput extends OutputBase {

  @Field(() => String, { nullable: true })
  token?: string;
}