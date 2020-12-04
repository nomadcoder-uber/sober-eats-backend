import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entitiy";

@Injectable()
export class UsersService  {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>
    ) {}

    async createAccount({email, password, role}: CreateAccountInput): Promise<string | undefined>{ //string or undefined를 return
        // check new user(사용자 DB에 존재하지 않는 email인지 확인)
        // create user(새로운 계정이면 create하기) & hash the password
        try{
            const exists = await this.users.findOne({email});
            if (exists) {
                return 'There is a user with that email already';
            }
            await this.users.save(this.users.create({email,password,role}))
        } catch(e){
            return "Couldn't create account";
        }
    }
}