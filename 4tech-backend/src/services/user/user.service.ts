import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user-repository/user-repository';
import { UserViewModel } from 'src/domain/UserViewModel';
import { LoginViewModel } from 'src/domain/Login.viewModel';

@Injectable()
export class UserService {
    constructor(readonly userRepository: UserRepository){
    }

    getUsers(){
        return this.userRepository.getUsers();
    }

    createNewUser(newUser: UserViewModel){
        const userList = this.userRepository.getUsers();

        const existingUser = userList.find( x => x.userName === newUser.userName);
        if(existingUser){
            throw new BadRequestException('This username already exist !');
        }
       return this.userRepository.createUser(newUser);
    }
    createNewUsers(newUsers: UserViewModel[]){
        const exist = this.userRepository.getUsers();
        let include = [];
        newUsers.map(user => exist.find(user => (user) ? 'Exist' : include.push(user)))
        return this.userRepository.createUsers(include);
    }
    attemptLogin(login: LoginViewModel){
        const userList = this.userRepository.getUsers();

        const foundLogin = userList.find( x => 
            x.userLogin == login.userLogin && 
            x.password === login.password 
        );
        return foundLogin;
    }
}
