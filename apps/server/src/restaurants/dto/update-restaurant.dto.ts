import { ArgsType, Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDTO } from "./create-restaurant.dto";
import { IsNumber, IsObject } from "class-validator";

@InputType()
export class UpdateRestaurantInputType extends PartialType(CreateRestaurantDTO) { }

@InputType()
export class UpdateRestaurantDTO {
  @Field(() => Int)
  @IsNumber()
  id: number

  @Field(() => UpdateRestaurantInputType)
  @IsObject()
  data: UpdateRestaurantInputType


}