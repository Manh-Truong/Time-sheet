import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "./../utils/LocalStorage"

const anxiosConfig = axios.create({
    baseURL: "http://dev-api-timesheet.nccsoft.vn/api",
    headers: {
        "Content-Type": "application/json",
    },
});

anxiosConfig.interceptors.request.use(
    (config: any) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

anxiosConfig.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default anxiosConfig;
