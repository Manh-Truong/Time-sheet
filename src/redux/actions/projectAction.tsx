import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createCustomerApi,
    createProjectApi,
    getAllCustomerApi,
    getProjectApi,
    getUserNotPaggingApi,
} from '../../api/project/projectApi'
import {
    ICreateCustomerReq,
    ICustomerReq,
} from '../../api/task/type'
import {
    ICreateProject,
    ICreateProjectRes,
    IProjectSearch,
} from '../../api/project/type'

export const getProject = createAsyncThunk(
    "/services/app/Project/GetAll",
    async ({ status, search }: IProjectSearch) => {
        const response = { ...(await getProjectApi({ status, search })) };
        return response;
    }
);

export const getUserNotPagging = createAsyncThunk(
    "/services/app/User/GetUserNotPagging",
    async () => {
        const response = await getUserNotPaggingApi();
        return response;
    }
);

export const getAllCustomer = createAsyncThunk(
    "/services/app/Customer/GetAll",
    async () => {
        const response = await getAllCustomerApi();
        return response;
    }
);

export const createCustomer = createAsyncThunk(
    "services/app/Customer/Save",
    async ({ id, name, address }: ICustomerReq) => {
        const create = await createCustomerApi({
            id,
            name,
            address,
        });
        return create as { result: ICreateCustomerReq };
    }
);

export const createProject = createAsyncThunk(
    "services/app/Project/Save",
    async ({
        id,
        name,
        code,
        status,
        timeStart,
        timeEnd,
        note,
        projectType,
        customerId,
        tasks,
        users,
        projectTargetUsers,
        isAllUserBelongTo,
    }: ICreateProject) => {
        const response = await createProjectApi({
            id,
            name,
            code,
            status,
            timeStart,
            timeEnd,
            note,
            projectType,
            customerId,
            tasks,
            users,
            projectTargetUsers,
            isAllUserBelongTo,
        });
        return response as ICreateProjectRes;
    }
);