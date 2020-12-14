import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context:ExecutionContext) {
       const gqlContext = GqlExecutionContext.create(context).getContext();
       const user = gqlContext['user']; //user를 가져옴
       if(!user){
           return false;
       }
        return true;
    }
}