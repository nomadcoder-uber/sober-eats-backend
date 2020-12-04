import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntitiy } from "src/common/entities/core.entitiy";
import { Column, Entity } from "typeorm";



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
    email: string;

    @Column()
    @Field(type => String)
    password:string;

    @Column({type:'enum', enum: UserRole})
    @Field(type => UserRole)
    role: UserRole;
}