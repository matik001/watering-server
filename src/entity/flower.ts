// BoardHistory
// Id BoardId time actionName 

// Board
// Id flowers sleepTime lastActiveTime sleepTo

// Flower
// Id BoardId WateringTime wateringHistory

// WateringHistory
// Id flowerId Time howLong Successful 

import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Board } from "./board";
import { WateringHistory } from "./wateringHistory";


@Entity()
export class Flower {

    @PrimaryGeneratedColumn()
    id: number;
    

    @ManyToOne(type=>Board, board=>board.flowers)
    board: Board;
    
    @Column()
    wateringTime: number; /// in seconds
    
    @OneToMany(type=>WateringHistory, history=>history.flower, {cascade: ['insert']})
    wateringHistory: WateringHistory[];
}

