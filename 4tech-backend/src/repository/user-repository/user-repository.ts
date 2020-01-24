import { Injectable, Get, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/UserViewModel';

@Injectable()
export class UserRepository {
    db:UserViewModel[] = [
        new UserViewModel('joao', 'jooao', '123')
    ];

    getUsers(){
        return this.db;
    }
    createUsers(newUsers: UserViewModel[]){
        newUsers.map(user => this.createUser(user));
        return 'Users Add with sucess!';
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
    deleteUser(index: number){
        this.db.splice(index,1);
    }
}
