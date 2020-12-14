import { UseGuards } from "@nestjs/common";
import { Args, ArgsType, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { User } from "./entities/user.entitiy";
import { UsersService } from "./user.service";

@Resolver(of => User)
export class UsesrResolver {
    constructor(private readonly userService : UsersService 
    ){}
    
    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{ //createAccountoutput을 return
        try {
            return  this.userService.createAccount(createAccountInput);
       
        
        }catch(error){
            return {
                error,
                ok:false
            }
        }

    }
    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try{
            const {ok,error,token}= await this.userService.login(loginInput);
            return {ok,error,token}
        }catch(error){
            return {
                ok:false,
                error,
            }
        }
    }
    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser:User) {
        return authUser;
        
      }
    @UseGuards(AuthUser)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args() userProfileInput: UserProfileInput):Promise<UserProfileOutput> {
        try{
            const user = await this.userService.findById(userProfileInput.userId);
            if(!user){
                throw Error();
            }
            return {
                ok:true,
                user,
            }
        } catch(e){
          return{
            error:'User Not Found',
            ok:false
            }
        }
    }
}