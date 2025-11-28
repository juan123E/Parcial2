import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/location/entities/location.entity";

@Entity()
export class Character {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('float')
    salary: number;

    @Column('bool', { default: false })
    employee: boolean;

    @OneToOne(() => Location, (location) => location.owner, { nullable: true })
    @JoinColumn()
    property: Location;

    @ManyToMany(() => Location, (location) => location.favCharacters)
    @JoinTable()
    favPlaces: Location[];
}