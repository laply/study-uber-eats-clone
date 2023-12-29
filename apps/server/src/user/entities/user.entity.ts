import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";


enum UserRole { client, owner, delivery }
registerEnumType(UserRole, { name: "UserRole" })

@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  email: string

  @Field(() => String)
  @Column()
  @IsString()
  password: string

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}