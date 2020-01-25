import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from 'src/domain/Login.viewModel';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repository/user-repository/user-repository';


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository, 
        private jwtService: JwtService){}

    async login(login : LoginViewModel){
        const user = await this.userRepository.getByCredentials(login.userLogin,login.password);

        if(!user){
            throw new BadRequestException('User Login or User Password incorrect!');
        }else{
            return {
                acess_token: this.jwtService.sign({status: 'Autorized!'}),
                userId: user._id,
            };
        }
    }
}
