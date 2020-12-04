import { Args, ArgsType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
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
            const error = await this.userService.createAccount(createAccountInput);
            if (error) {
                return {
                    ok: false,
                    error,
                }
            }
            return{
                ok:true
            }
            
        }catch(error){
            return {
                error,
                ok:false
            }
        }

    }
}