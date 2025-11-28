import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true }) 
    token: string;

    @Column('boolean', { default: true })
    active: boolean;

    @Column('int', { default: 10 }) 
    reqLeft : number;
}