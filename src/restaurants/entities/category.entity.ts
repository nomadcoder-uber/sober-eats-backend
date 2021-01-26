import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntitiy } from 'src/common/entities/core.entitiy';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entitiy';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType() //스키마 빌드를 위한 graphql decorator
@Entity() //typeorm decorator
export class Category extends CoreEntitiy {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((type) => [Restaurant], { nullable: true })
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
