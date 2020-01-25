import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Strategy } from 'passport-jwt';
import { UserActivityCommentDto } from '../dto/user-Activity-coment.dto';

export interface UserActivity extends Document{ // Filtro para criar e Encontrar
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly userId: string;
    readonly userName: string;
    readonly fileName: string;
    readonly timestamp: Date;
    likes: string[];
    comments: UserActivityCommentDto[];
}

const userActivityComentsSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    timestamp:{
        type: Date,
        default: Date.now(),
    },
});
export const UserActivitySchema = new mongoose.Schema({
    userId: String,
    userName: String,
    fileName: String,
    likes: [String], // Usuarios que curtiram a foto
    timestamp: { // Qual horario foi postado 
        type: Date,
        default: Date.now(),
    },
    comments: [userActivityComentsSchema]
});


