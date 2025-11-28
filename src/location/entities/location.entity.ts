import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "src/character/entities/character.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    type: string;

    @Column('float')
    cost: number;

    @OneToOne(() => Character, (character) => character.property)
    owner: Character;

    @ManyToMany(() => Character, (character) => character.favPlaces)
    favCharacters: Character[];
}