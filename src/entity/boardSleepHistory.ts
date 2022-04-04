import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Board } from "./board";

const SLEEP_STATUSES = {
    START: "START",
    STOP: "STOP"
};


@Entity()
export class BoardSleepHistory {

    @PrimaryGeneratedColumn()
    id: number;
    
    
    @ManyToOne(type=>Board, board=>board.sleepHistory)
    board: Board;

    @Column('timestamptz')
    time: Date;   

    @Column()
    howLong: number;
}

