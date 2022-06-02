import { IError } from '../commonType'

export interface IFormLoginRequest {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean;
}

export interface IFormLoginResponse {
    result: {
        accessToken: string;
        encryptedAccessToken: string;
        expireInSeconds: number;
        userId: number;
    };
    error: IError;
    success: boolean;
}





