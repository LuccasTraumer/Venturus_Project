import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class WebscoketGateway {
  @WebSocketServer() server;

  notifyOnLike(userActivityId: string, userId: string){
    this.server.emit('events',{mediaId: userActivityId,userId});
  }
}
