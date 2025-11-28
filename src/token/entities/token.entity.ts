import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        nullable: false,
    })
    Token: string;

    @Column('bool', {
        nullable:false,
        default: true
    })
    Active: boolean;

    @Column({
        type: 'number',
        nullable: false,
        default: 10,
    })
    reqLeft :number;
}
