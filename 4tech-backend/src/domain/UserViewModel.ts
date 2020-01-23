import { IsNotEmpty, MaxLength, Max, Length } from 'class-validator';
import passport = require('passport');

export class UserViewModel{

    constructor(userLogin: string,userName: string, password: string){
        this.userLogin = userLogin,
        this.userName = userName ,
        this.password = password
    }
    @IsNotEmpty()
    @Length(3,10)
    readonly userLogin: string;
    @IsNotEmpty()
    @Length(3,10)
    userName: string;
    @IsNotEmpty()
    @Length(3,10) 
    readonly password: string;
}