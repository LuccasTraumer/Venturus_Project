import { Injectable, Get } from '@nestjs/common';
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
}
