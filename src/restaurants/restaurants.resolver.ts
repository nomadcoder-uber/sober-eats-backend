import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entitiy";



@Resolver(of => Restaurant) // resolver는 Restaurant의 resolver가 된다
export class RestaurantResolver{
    @Query(returns => [Restaurant]) 
    restaurants(@Args('veganOnly') veganOnly: Boolean): Restaurant[]{
        return [];
    }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() CreateRestaurantDto: CreateRestaurantDto,
    ): boolean {
        return true;
    }
   
}


