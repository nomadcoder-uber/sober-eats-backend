import { CoreEntitiy } from "src/common/entities/core.entitiy";
import { Column, Entity } from "typeorm";

type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends CoreEntitiy{
    @Column()
    email: string;

    @Column()
    password:string;

    @Column()
    role: UserRole;
}