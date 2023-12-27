import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './restaurants/entities/restaurants.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev"
        : process.env.NODE_ENV === "test" ? ".env.test" : ".env",
      ignoreEnvFile: process.env.NODE_ENV == 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test')
          .default('dev').required(),
        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PW: Joi.string().required(),
        DB_PORT: Joi.number().default(5400).required(),
        DB_NAME: Joi.string().default('uber-eats').required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [Restaurant]
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }), RestaurantsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
