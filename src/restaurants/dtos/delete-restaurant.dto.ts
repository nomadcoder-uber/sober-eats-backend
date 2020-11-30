import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurant.dto";



// @InputType()
//  class DeleteRestaurantInputType extends PartialType(CreateRestaurantDto){
// }

// @InputType()
// export class DeleteRestaurantDto{
//     @Field(type => Number)
//     id: number;
// }