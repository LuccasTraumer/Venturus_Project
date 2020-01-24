import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

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


