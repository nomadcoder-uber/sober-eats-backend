import { Field } from "@nestjs/graphql";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class CoreEntitiy {
    @PrimaryGeneratedColumn()
    @Field(type=>Number)
    id: number;

    @CreateDateColumn()
    @Field(type=>Date)
    createAt:Date;

    @UpdateDateColumn()
    @Field(type=>Date)
    updateAt: Date;
}