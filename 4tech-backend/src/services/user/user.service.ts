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
    
    async createNewUser(newUser: UserViewModel){
        const userList = await this.userRepository.getUsers();

        const existingUser = userList.find( x => x.userName === newUser.userName);
        if(existingUser){
            throw new BadRequestException('This username already exist !');
        }
       return this.userRepository.createUser(newUser);
    }
    
     async createNewUsers(newUsers: UserViewModel[]){
        const exist = await this.userRepository.getUsers();
        let userExist = '';
        newUsers.map(async user => {
            const found =  exist.find(existUser => {
                if (user.userName === existUser.userName &&
                    user.userLogin === existUser.userLogin)
                    {
                        userExist += user.userName + ",";
                        return true;
                    }
            });
            if (!found) {
                await this.userRepository.createUser(user);
            }
        },
        );
        if(userExist != null){
            return `Users ${userExist} already exist in database`;
        }
    }

    async alterUser(user: UserViewModel){
        const userList = await this.userRepository.getUsers();

        const existingUsers = userList.find( x => 
            x.userLogin === user.userLogin && 
            x.password === user.password
        );
        if(!existingUsers){
            throw new BadRequestException('User dont exist, Create a User for Alter him');
        }else{
            return await this.userRepository.alterUser(user);
        }
    }
    async deleteUser(user: UserViewModel){
        const userList = await this.userRepository.getUsers();
        let index;
        const exist = userList.forEach((elem, ind)=> {
            if(user.userLogin === elem.userLogin && user.password === elem.password){
                index = ind
            }
        })
        if(index === null){
            throw new BadRequestException('User dont exist for delete! ');
        }else{
            return await this.userRepository.deleteUser(index);
        }
    }
    
    async attemptLogin(login: LoginViewModel){
        const userList = await this.userRepository.getUsers();

        const foundLogin = userList.find( x => 
            x.userLogin == login.userLogin && 
            x.password === login.password 
        );
        return foundLogin;
    }
}
