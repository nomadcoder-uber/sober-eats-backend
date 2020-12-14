import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entitiy";


@ObjectType()
export class EditProfileOutput extends CoreOutput {}


@InputType()
export class EditProfileInput extends PartialType(PickType(User, ["email","password"])){} //user에서 email,password를 가지고 class를 만들고
// partialtype을 사용해서 optional 하게 생성
