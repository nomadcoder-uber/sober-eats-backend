import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entitiy'
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/user.service';
import { JwtMiddleware } from './jwt.middleware';

@Module({})
@Global()
export class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule {
        return{
            module :JwtModule,
            providers:[
            {
                provide: CONFIG_OPTIONS,
                useValue: options,

            },
            JwtService,
        ],
        exports:[JwtService],

        }

    }
}
