import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entitiy';

@Module({
  imports: [GraphQLModule.forRoot(
    {autoSchemaFile:true
    }),
    ConfigModule.forRoot({
      isGlobal:true, //어플리케이션의 어디에서든 config 모듈에 접근옵션
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",//우리 폴더에서 .env 파일을 읽는다
      ignoreEnvFile: process.env.NODE_ENV ==="prod",//서버에 deploy 할때 환경변수 파일을 사용하지 않는 옵션
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev','prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT : Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD:Joi.string().required(),
        DB_NAME:Joi.string().required()

      })
    }),
  TypeOrmModule.forRoot({
    type:'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    synchronize:process.env.NODE_ENV !=="prod", //typeorm이 entitiy를 찾아서 알아서 migration해주는옵션
    logging:true,
    entities:[Restaurant]

  }),
  RestaurantsModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
