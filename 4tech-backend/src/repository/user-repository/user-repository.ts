import { Injectable, Get, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/UserViewModel';
import { InjectModel } from '@nestjs/mongoose';
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
        const usersExist = await this.getUsers();
        usersExist.forEach((elem)=>{
            if(elem.userLogin === user.userLogin && elem.password === user.password){
                elem.userName = user.userName;
            }
        })
        

        return 'User altered with sucess!'
    }
    async deleteUser(index: number){
        const users = await this.userCollection;

        await users.splice(index,1);
        
    }
}
