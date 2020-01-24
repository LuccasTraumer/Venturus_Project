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
        const include = [];
        newUsers.map(user => {
            const found = exist.find(existUser => {
                if (user.userName === existUser.userName &&
                    user.userLogin === existUser.userLogin)
                    return true;
            });
            if (!found) {
                this.userRepository.createUser(user);
            }
        });
        //return this.userRepository.createUsers(include);
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
        let index;
        const exist = userList.forEach((elem, ind)=> {
            if(user.userLogin === elem.userLogin && user.password === elem.password){
                index = ind
            }
        })
        if(index === null){
            throw new BadRequestException('User dont exist for delete! ');
        }else{
            return this.userRepository.deleteUser(index);
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
