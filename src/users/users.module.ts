import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { UsersService } from './user.service';
import { UsesrResolver } from './users.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UsesrResolver,UsersService],
    exports:[UsersService]
})
export class UsersModule {}
