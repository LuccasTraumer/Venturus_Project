import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from 'src/domain/Login.viewModel';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    login(login : LoginViewModel){
        const user = this.userService.attemptLogin(login);

        if(user){
            return 'Autenticado!';
        }else{
            throw new BadRequestException('User Login or User Password incorrect!');
        }
    }
}
