import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/UserViewModel';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){
        
    }

   @Get()
        retornUsers(){
        return this.userService.getUsers();
        }
    @Post()
        criarUsuarios(@Body() newUser: UserViewModel){
            return this.userService.createNewUser(newUser);
        }
}