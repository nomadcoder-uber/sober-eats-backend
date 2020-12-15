import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntitiy } from "src/common/entities/core.entitiy";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entitiy";


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntitiy{

    @Column()
    @Field(type=>String)
    code:string;

    @OneToOne(type=>User)
    @JoinColumn()
    user:User;
}
