import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

// NUNCA DEVE SER EXPOSTA PUBLICAMENTE
//
// A chave secreta só está a mostra a fins de deixar claro o que 
// o código está fazendo. Em um ambiente de produção, a chave
// deve estar protegida por medidas apropriadas ( como por exemplo
// secret vaults, variáveis de ambiente ou serviços de configuração.)
export const secretKey = 'insterstellar';

@Injectable() //possivel classe de ser injetada como dependencia de outra, coloca no construtor e é instanciada na hora
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Vai extrair as informações do Header da Requisição
            ignoreExpiration: false,  // Vai ignorar a inspiração
            secretOrKey: secretKey, // Qual vai ser a chave secreta 
        });
    }

    async validate(payload: any){
        return { userLogin: payload.userLogin };
    }
}