import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    type: string;
   @Column({
        type: 'number',
        nullable: false,
    })
    cost:number;

}
