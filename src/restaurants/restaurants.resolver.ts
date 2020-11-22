import { Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entitiy";



@Resolver(of => Restaurant) // resolver는 Restaurant의 resolver가 된다
export class RestaurantResolver{
    @Query(returns => Restaurant) 
    myRestaurant(){
        return true;
    }
   
}


