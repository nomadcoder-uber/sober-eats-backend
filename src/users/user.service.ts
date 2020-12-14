import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entitiy";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";

@Injectable()
export class UsersService  {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly jwtService: JwtService
    ) {
    }

    async createAccount({email, password, role}: CreateAccountInput): Promise<{ok: boolean; error?:string}>{ //object를 return
        // check new user(사용자 DB에 존재하지 않는 email인지 확인)
        // create user(새로운 계정이면 create하기) & hash the password
        try{
            const exists = await this.users.findOne({email});
            if (exists) {
                return {ok: false, error: 'There is a user with that email already'};
            }
            await this.users.save(this.users.create({email,password,role}));
            return {ok:true};
        } catch(e){
            return {ok: false, error:"Couldn't create account"};
        }
    }

    async login({email,password}: LoginInput): Promise<{ok: boolean; error?:string; token?:string}> {
            //find the user with the email 
            //check if the password is correct
            //make a JWT and give it to the user
        try{
            const user = await this.users.findOne({email});
            if(!user){
                return {
                    ok:false,
                    error: 'User not found',
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect){
                return {
                    ok:false,
                    error: 'Wrong password',
                }
            }
            const token = this.jwtService.sign(user.id);
            return {
                ok:true,
                token,
            }
        }catch(error){
            return{
                ok:false,
                error,
            }
        }
    }
    async findById(id: number): Promise<User> {
        return this.users.findOne({ id });
      }

    async editProfile(userId:number, {email,password} :EditProfileInput):Promise<User> {
        const user = await this.users.findOne(userId);
        if(email){
            user.email = email
        }
        if(password){
            user.password = password
        }        
        return this.users.save(user);
    }
}
