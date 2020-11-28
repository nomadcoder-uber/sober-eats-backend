import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
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
    async createRestaurant(
        @Args('input') CreateRestaurantDto: CreateRestaurantDto,
    ): Promise<boolean> {
        try{
            await this.restaurantService.createRestaurant(CreateRestaurantDto);
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
        
    }
    @Mutation(returns => Boolean)
    async updateRestaurant(@Args('input') updateRestaurantDto:UpdateRestaurantDto): Promise<Boolean>{
        try{
            await this.restaurantService.updateRestaurant(updateRestaurantDto)
            return true;
        }catch(e){
            console.log(e);
            return false;
        
    }
   
    }
}

