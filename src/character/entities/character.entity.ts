import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text', {
        nullable: false,
    })
    name: string;

    @Column({
        type: 'number',
        nullable: false,
        default: 0,
    })
    salary:number;
     @Column('bool', {
        nullable:false,
        default: false
    })
    employee: boolean;
    @Column('text',{
        nullable: false
    })
    property: string
    @Column('text', {
        array: true,
        nullable: true
    })
    favPlaces: string[]


   
}
