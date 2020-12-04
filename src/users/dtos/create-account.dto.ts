import { Field, InputType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entitiy";



@InputType()
export class CreateAccountInput extends PickType(User, ["email", "password", "role"])
{}



export class CreateAccountOutput {
    @Field(type => String, {nullable: true})
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}