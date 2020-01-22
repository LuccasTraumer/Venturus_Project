import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user-repository/user-repository';
import { UserViewModel } from 'src/domain/UserViewModel';

@Injectable()
export class UserService {
    constructor(readonly userRepository: UserRepository){
    }

    getUsers(){
        return this.userRepository.getUsers();
    }

    createNewUser(newUser: UserViewModel){
       return this.userRepository.createUser(newUser);
    }
}
