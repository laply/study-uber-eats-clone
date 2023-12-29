import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { OutputBase } from "./output.dto";


@InputType()
export class CreateAccountInput extends PickType(
  User, ["email", "password", "role"], InputType
) { }

@ObjectType()
export class CreateAccountOutput extends OutputBase { }