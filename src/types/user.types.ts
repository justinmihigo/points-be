export interface IUser{
    fullname: string;
    phone:string;
    email: string;
    gender: string;
    status: string;
    hasScanned: string[];
    favoriteActivity: string;
    points: number;
    createdAt: Date;
    updatedAt: Date;
}