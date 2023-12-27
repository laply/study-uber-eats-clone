import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurants.entity";
import { CreateRestaurantDTO } from "./dto/create-restaurant.dto";
import { RestaurantsService } from "./restaurants.service";
import { UpdateRestaurantDTO } from "./dto/update-restaurant.dto";

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) { }
  @Query(() => [Restaurant])
  async restaurants(
  ): Promise<Restaurant[]> {
    return await this.restaurantsService.getAll()
  }

  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDTO
  ): Promise<boolean> {
    try {
      await this.restaurantsService.create(createRestaurantDto)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurant(
    @Args('input') updateRestaurantDto: UpdateRestaurantDTO
  ): Promise<boolean> {
    try {
      await this.restaurantsService.update(updateRestaurantDto)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}