import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: Number;

  @Field(() => String)
  @IsString()
  @Column()
  @Length(5)
  name: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  veganOnly: Boolean;

  @Field(() => String, { defaultValue: '강남' })
  @Column({ default: '강남' })
  @IsString()
  address: String

  @Field(() => String)
  @IsString()
  @Column()
  ownersName: String

  @Field(() => String)
  @IsString()
  @Column()
  categoryName: string
}