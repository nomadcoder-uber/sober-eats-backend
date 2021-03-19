import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntitiy } from 'src/common/entities/core.entitiy';

@InputType()
export class DeleteDishInput {
  @Field((type) => Int)
  dishId: number;
}

@ObjectType()
export class DeleteDishOutput extends CoreEntitiy {}
