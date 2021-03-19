import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreEntitiy } from 'src/common/entities/core.entitiy';
import { Dish } from '../entities/dish.entity';

@InputType()
export class EditDishInput extends PickType(PartialType(Dish), [
  'name',
  'options',
  'price',
  'description',
]) {}

@ObjectType()
export class EditDishOutput extends CoreEntitiy {}
