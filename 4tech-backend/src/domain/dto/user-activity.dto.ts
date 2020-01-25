import { UserActivityCommentDto } from "./user-Activity-coment.dto";

export class userActivitityDto{
    constructor(userId: string, fileName: string, userName: string){
        this.userId = userId;
        this.fileName = fileName;
        this.userName = userName;
        this.timestap = new Date();
        this.likes = [];
        this.comments = [];
    }
    readonly userId: string;
    readonly fileName: string;
    readonly userName: string;
    readonly timestap: Date;
    readonly likes : string[];
    readonly comments: UserActivityCommentDto[];
    
}