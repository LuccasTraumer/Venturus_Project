import { Injectable } from '@nestjs/common';

@Injectable()
export class UserActivityService {
    updloadImage(userId: string, fileName: string,description: string ){
        return 'Upload';
    }
}
