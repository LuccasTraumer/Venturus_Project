import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user-repository/user-repository';
import { userActivitityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-Activity-coment.dto';
import { UserActivityRepository } from 'src/repository/user-repository/user-activity-repository/user-activity.repository';
import { UserActivity } from 'src/domain/schemas/user-activity-schema';
import { readFileSync } from 'fs';
import { LikeOrDislikeViewModel } from 'src/domain/like-or-dislike.viewmodel';
import { WebscoketGateway } from 'src/webscoket/webscoket.gateway';

@Injectable()
export class UserActivityService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository,
        private readonly websocketGateway: WebscoketGateway){

    }
    async getRecentUploads(index: string){
        const indexAsNumber = parseInt(index,0);

        if(isNaN(indexAsNumber)){
            throw new BadRequestException('Invalid Index');
        }

        const recentUploads = await this.userActivityRepository.getPaged(indexAsNumber)
        return await this.convertImagesToBase64(recentUploads);
    }
    async updloadImage(userId: string, fileName: string,description: string ){
        const user = await this.userRepository.getById(userId);
        if(!user){
            throw new BadRequestException('This user does not exist !');
        }
        

        const uploadImageObj = new userActivitityDto(userId, fileName, user.userName);
        if(description){
            uploadImageObj.comments.push(new UserActivityCommentDto(
                userId,user.userName,description,
            ));
        }
        const createdUserActivity = await this.userActivityRepository.create(uploadImageObj);

        return this.convertImageToBase64ForOneFile(createdUserActivity);

        //return await this.userActivityRepository.create(uploadImageObj);
    }

    async likeOrDislikeUserActivity(likeOrDislikeViewModel: LikeOrDislikeViewModel){
        const userActivity = await this.userActivityRepository.getById(likeOrDislikeViewModel.userActivityId);
        if(!userActivity){
            throw new BadRequestException('An user Activity with the give id does not exist')
        }

        const user = await this.userRepository.getById(likeOrDislikeViewModel.userId);
        if(!user){
            throw new BadRequestException('An user Activity with the give id does not exist')
        }
        if(userActivity.likes.includes(user._id.toString())){
            userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString());
        }else{
            userActivity.likes.push(user._id.toString());
        }

        const updatedUserActivity = await this.userActivityRepository.update(userActivity);
        this.websocketGateway.notifyOnLike(userActivity._id,userActivity.userId);

        return updatedUserActivity;
    }

    convertImagesToBase64(userActivity: UserActivity[]){
        return Promise.all(
            userActivity.map(userActivity => {
            return {
                ...userActivity,
                imgEncoded: readFileSync('../images/'+userActivity.fileName,'base64')
            }
        })
        )
    }

    convertImageToBase64ForOneFile(userActivity: UserActivity){
        return {
            ...userActivity,
            imgEncoded: readFileSync('../images/'+ userActivity.fileName,'base64')
        }
    }
}
