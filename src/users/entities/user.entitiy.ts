import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntitiy } from "src/common/entities/core.entitiy";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum } from "class-validator";


enum UserRole { // userrole.dlivery로 사용가능
    Client,
    Owner,
    Delivery,
}
registerEnumType(UserRole, {name:"UserRole"});

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntitiy{
    
    @Column()
    @Field(type => String)
    @IsEmail()
    email: string;

    @Column()
    @Field(type => String)
    password:string;

    @Column({type:'enum', enum: UserRole})
    @Field(type => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @BeforeInsert() //DB에 password 넣기 전에 hash 하는 방법
    async hashPassword(): Promise<void> {
        try{
            this.password = await bcrypt.hash(this.password, 10);
        } catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }

    }
}