import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entitiy';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile:true,
    context: ({ req }) => ({ user: req['user'] }),
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
        DB_NAME:Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),  //token을 지정하기 위해 사용하는 privateKey

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
    logging:process.env.NODE_ENV !=='prod'&& process.env.NODE_ENV !== 'test', //DB에서 돌아가는 모든 로그들을 확인하는 옵션
    entities:[User]

  }),
  JwtModule.forRoot({
    privateKey: process.env.PRIVATE_KEY,
  }),
  UsersModule,
 
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
