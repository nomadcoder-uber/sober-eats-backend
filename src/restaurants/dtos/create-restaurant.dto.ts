import { InputType, OmitType } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurant.entitiy";


@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ["id"], InputType){}