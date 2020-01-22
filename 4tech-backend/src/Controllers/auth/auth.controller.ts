import { Controller, Post, Body } from '@nestjs/common';
import { LoginViewModel } from 'src/domain/Login.viewModel';
import { AuthService } from 'src/services/auth/auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){
    }
    
    @Post('login') // Metodo/Verbo que ira utilizar
    login(@Body() login: LoginViewModel){
        return this.authService.login(login);
    }
}
