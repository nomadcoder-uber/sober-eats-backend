import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entitiy";
import { RestaurantService } from "./restaurants.service";



@Resolver(of => Restaurant) // resolver는 Restaurant의 resolver가 된다
export class RestaurantResolver{
    constructor(private readonly restaurantService: RestaurantService){}
    @Query(returns => [Restaurant]) 
    restaurants():Promise<Restaurant[]>{ // Restaurant라는 빈 리스트를 리턴
        return this.restaurantService.getAll();
    }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() CreateRestaurantDto: CreateRestaurantDto,
    ): boolean {
        return true;
    }
   
}


