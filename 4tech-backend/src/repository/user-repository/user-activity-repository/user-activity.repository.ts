import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserActivity } from "src/domain/schemas/user-activity-schema";
import { Model } from 'mongoose';
import { userActivitityDto } from "src/domain/dto/user-activity.dto";
import { User } from "src/domain/schemas/user.schema";

@Injectable()
export class UserActivityRepository{
    constructor(@InjectModel('UserActivity') private readonly userActivityCollection: Model<UserActivity>){

    }

    async getPaged(index: number){
        return await this.userActivityCollection
        .find() // Vai encontrar no BD
        .sort({timestamp: -1}) // Qual campo vai ordenar e a ordem que vai ordenar,Ou seja vai pegar os ultimos campos 
        .skip(index) // Carregar de 10 em 10
        .limit(10) // limita em 10
        .lean();
    }

    async create(userActivityDto: userActivitityDto){
        const newUserActivity = this.userActivityCollection(userActivityDto);
        await newUserActivity.save();

        return this.getById(newUserActivity._id);
    }

    async getById(id: string): Promise<UserActivity>{
        return await this.userActivityCollection
        .findOne({_id: id})
        .lean();
    }
    async update(userActivity: UserActivity){
        const updateActivity = await this.userActivityCollection.findOneAndUpdate(
            {_id: userActivity._id},
                userActivity,
                {new: true});
                return await updateActivity.save();
    }

}