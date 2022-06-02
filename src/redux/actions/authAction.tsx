import { createAsyncThunk } from "@reduxjs/toolkit";
import getAuthenticateApi from '../../api/auth/authenticateApi';
import { IFormLoginRequest } from '../../api/auth/type';

export const getAuthenticate = createAsyncThunk(
    "TokenAuth/Authenticate",
    async ({
        userNameOrEmailAddress,
        password,
        rememberClient,
    }: IFormLoginRequest) => {
        const response = {
            ...await getAuthenticateApi({
                userNameOrEmailAddress,
                password,
                rememberClient,
            })
        };
        return response;
    }
);
