import {v4 as uuidv4} from 'uuid';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntitiy } from "src/common/entities/core.entitiy";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entitiy";


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntitiy{

    @Column()
    @Field(type=>String)
    code:string;

    @OneToOne(type=>User, {onDelete:'CASCADE'})
    @JoinColumn()
    user:User;

    @BeforeInsert()
    createCode():void{
        this.code = uuidv4();
    }
}
