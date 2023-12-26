import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";

@ArgsType()
export class CreateRestaurantDTO {
  @Field(() => String)
  @IsString()
  @Length(5, 15)
  name: string

  @Field(() => Boolean)
  @IsBoolean()
  veganOnly: Boolean

  @Field(() => String)
  @IsString()
  address: string

  @Field(() => String)
  @IsString()
  ownersName: string
}