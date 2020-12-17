import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { createGzip } from "zlib";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { User } from "./entities/user.entitiy";
import { UsersService } from "./user.service";

@Resolver(of => User)
export class UsesrResolver {
    constructor(private readonly userService : UsersService 
    ){}
    
    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{ //createAccountoutput을 return
            return  this.userService.createAccount(createAccountInput);

    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
         return this.userService.login(loginInput);
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser:User) {
        return authUser;
        
      }
    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args() userProfileInput: UserProfileInput):Promise<UserProfileOutput> {
        
        return this.userService.findById(userProfileInput.userId);
            
    }

    @UseGuards(AuthGuard)
    @Mutation(returns=> EditProfileOutput)
    async editProfile(@AuthUser() authUser:User, @Args('input') editProfileInput:EditProfileInput): Promise<EditProfileOutput> {

            return this.userService.editProfile(authUser.id,editProfileInput)

    }

    @Mutation(returns=>VerifyEmailOutput)
    async verifyEmail(@Args('input') {code}:VerifyEmailInput):Promise<VerifyEmailOutput> {
  
            return this.userService.verifyEmail(code);
         
        
    }
}