import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class CoreEntitiy {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt: Date;
}