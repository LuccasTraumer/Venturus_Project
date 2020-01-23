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

    alterUser(user: UserViewModel){
        const userList = this.userRepository.getUsers();

        const existingUsers = userList.find(x => 
            x.userLogin === user.userLogin && 
            x.password === user.password
        );
        if(!existingUsers){
            throw new BadRequestException('User dont exist, Create a User for Alter him');
        }else{
            return this.userRepository.alterUser(user);
        }
    }
    deleteUser(user: UserViewModel){
        const userList = this.userRepository.getUsers();

        const existingUser = userList.find(elem => 
            elem.userLogin === user.userLogin && 
            elem.password === user.password &&
            elem.userName === user.userName
        );
        if(!existingUser){
            throw new BadRequestException('User dont exist for delete! ');
        }else{
            return this.userRepository.deleteUser(user);
        }
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
