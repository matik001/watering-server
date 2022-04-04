import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Flower } from "./flower";


@Entity()
export class WateringHistory {

    @PrimaryGeneratedColumn()
    id: number;
    

    @ManyToOne(type=>Flower, flower=>flower.wateringHistory)
    flower: Flower;
    
    @Column('timestamptz')
    time: Date;    

    @Column()
    howLong: number; /// in seconds
    
    
    @Column()
    wasSuccessful: boolean;
}

