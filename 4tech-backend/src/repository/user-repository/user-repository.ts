import { Injectable, Get, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/UserViewModel';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/schemas/user.schema';
@Injectable()
export class UserRepository {
    constructor(@InjectModel('User')private readonly userCollection: Model<User>){
        
    }

    
    async getUsers(): Promise<User[]>{
        const tes = await this.userCollection
        .find()
        .lean();
        return tes;
    }

    async createUser(newUser: UserViewModel){
        const user = this.userCollection(newUser); // Vai tentar fazer uma Schema
        return await user.save();
    }
    
    async alterUser(user: UserViewModel){
         //const usersExist = await this.userCollection.findByIdAndUpdate(mongoose.mongo.ObjectId(user._id), user);
         const filter = {userLogin: user.userLogin, password: user.password};
         const update = {userName: user.userName};

         await this.userCollection.findOneAndUpdate(filter,update);
            return 'sucess'

    }
    async deleteUser(user: UserViewModel){
        if(await this.userCollection.deleteOne({userLogin: user.userLogin, password: user.password})){
            return 'deleted !'
        }else{
            return 'user dont exist for deleted!'
        }
        
    }
}
