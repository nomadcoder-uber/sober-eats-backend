import { Args, ArgsType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
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
    
    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{ //createAccountoutput을 return
        try {
            const {ok, error} = await this.userService.createAccount(createAccountInput);
            return {
                ok: false,
                error,
            }
        
        }catch(error){
            return {
                error,
                ok:false
            }
        }

    }
    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput){}
}