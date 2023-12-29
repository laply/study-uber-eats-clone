import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { loginInput, loginOutput } from "./dto/login.dto";


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async getAccount(): Promise<User[]> {
    return await this.userService.getAll()
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    try {
      return this.userService.create(createAccountInput);
    } catch (error) {
      return {
        error,
        success: false
      }
    }
  }


  @Mutation(() => loginOutput)
  async login(
    @Args('input') loginInput: loginInput
  ): Promise<loginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return {
        error,
        success: false
      }
    }
  }

}