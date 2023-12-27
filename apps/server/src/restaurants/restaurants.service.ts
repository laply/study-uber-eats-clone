import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { UpdateRestaurantDTO } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>) { }

  getAll(
  ): Promise<Restaurant[]> {
    return this.restaurants.find({})
  }

  create(
    createRestaurantDto: CreateRestaurantDTO
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto)
    return this.restaurants.save(newRestaurant);
  }

  update(
    { id, data }: UpdateRestaurantDTO
  ): Promise<UpdateResult> {
    return this.restaurants.update(
      id, { ...data })

  }
}

