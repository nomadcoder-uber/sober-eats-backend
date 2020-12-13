import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entitiy';
import { UsersService } from './user.service';
import { UsesrResolver } from './users.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UsesrResolver,UsersService],
    exports:[UsersService]
})
export class UsersModule {}
