import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@ObjectType()
@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    @Field(type=>Number)
    id:number;

    @Field(type => String)
    @Column()
    @IsString()
    @Length(5)
    name: string;

    @Field(type => Boolean, {nullable:true}) //graphql 스키마 설정
    @Column({default:true}) //database에 반영
    @IsOptional() //해당 필드를 보내거나 보내지 않을수있다 (validation 설정)
    @IsBoolean()
    isVegan:boolean;

    @Field(type=> String, {defaultValue:"강남"})
    @Column()
    @IsString()
    address:string;

}