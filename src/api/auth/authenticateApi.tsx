import { postApi } from '../../utils/ApiHelpers'
import { IFormLoginRequest, IFormLoginResponse } from './type'

const getAuthenticateApi = async ({
    userNameOrEmailAddress,
    password,
    rememberClient,
}: IFormLoginRequest) => {
    const data = await postApi<IFormLoginRequest, IFormLoginResponse>(
        `/TokenAuth/Authenticate`,
        { userNameOrEmailAddress, password, rememberClient }
    );
    return data;
};

export default getAuthenticateApi;