import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/UserViewModel';


/*
    Resumo da Estrutura REST: 
    Controller é a Primeira camada vai delegar a responsabilidade para o Service
    Do Service vai para Repository, do Respository pro BD.

    Model esta presente em todas as classes.

*/
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

    @Put()
        alterUser(@Body() user: UserViewModel){
            return this.userService.alterUser(user);
        }
    @Delete()
        deleteUser(@Body() user: UserViewModel){
            return this.userService.deleteUser(user);
        }
}