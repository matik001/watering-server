// BoardHistory
// Id BoardId time actionName 

// Board
// Id flowers maxsleepTime lastActiveTime sleepTo

// Flower
// Id BoardId WateringTime wateringHistory

// WateringHistory
// Id flowerId Time howLong Successful 

import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { BoardSleepHistory } from "./boardSleepHistory";
import { Flower } from "./flower";
import { WateringHistory } from "./wateringHistory";


@Entity()
export class Board {

    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    name:string;
    
    @OneToMany(type=>Flower, flower=>flower.board, {cascade: ['insert']})
    flowers: Flower[];

    @OneToMany(type=>BoardSleepHistory, sleepHistory=>sleepHistory.board)
    sleepHistory: BoardSleepHistory[];

    @Column()
    maxSleepTime: number; /// in seconds

        
    @Column('timestamptz')
    lastWatering: Date;   

    @Column('timestamptz', {nullable: true})
    sleepTo?: Date;   
}

