import { Injectable, Get, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/UserViewModel';

@Injectable()
export class UserRepository {
    db:UserViewModel[] = [];

    getUsers(){
        return this.db;
    }
    createUser(newUser: UserViewModel){
        this.db.push(newUser);
        return 'User sucessfully added';
    }
    alterUser(user: UserViewModel){
        this.db.map(elem => {
            if(elem.userLogin === user.userLogin && elem.password === user.password){
                elem.userName = user.userName;
            }
        });

        return 'User altered with sucess!'
    }
    deleteUser(user: UserViewModel){
        //this.db.splice(x,1,null);
        this.db.forEach((elem,i) => {
            if(elem.userLogin === user.userLogin && elem.password === user.password){
                this.db[i] = null;
                return 'deleted!';
            }
        });
    }
}
