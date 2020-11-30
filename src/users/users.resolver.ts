import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entitiy";
import { UsersService } from "./user.service";

@Resolver(of => User)
export class UsesrResolver {
    constructor(private readonly userService : UsersService 
    ){}
    

    @Query(returns => Boolean)
    hi() {
        return true;
    }
}