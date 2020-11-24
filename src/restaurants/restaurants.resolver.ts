import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entitiy";



@Resolver(of => Restaurant) // resolver는 Restaurant의 resolver가 된다
export class RestaurantResolver{
    @Query(returns => [Restaurant]) 
    restaurants(@Args('veganOnly') veganOnly: Boolean): Restaurant[]{ // Restaurant라는 빈 리스트를 리턴
        return [];
    }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() CreateRestaurantDto: CreateRestaurantDto,
    ): boolean {
        return true;
    }
   
}


