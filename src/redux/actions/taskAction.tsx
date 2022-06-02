import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ICreateTaskReq,
    IDeArchiveTaskReq,
    ITaskRequest,
} from '../../api/task/type'
import getTaskApi, {
    archiveTaskApi,
    createTaskApi,
    deArchiveTaskApi,
    deleteTaskApi,
} from '../../api/task/taskApi'

export const getTask = createAsyncThunk(
    "/services/app/Task/GetAll",
    async () => {
        const response = await getTaskApi();
        return response;
    }
);

export const createTask = createAsyncThunk(
    "/services/app/Task/Save",
    async ({ id, name, type }: ICreateTaskReq) => {
        const create = await createTaskApi({
            id,
            name,
            type,
        });
        return create as { result: ITaskRequest };
    }
);

export const deleteTask = createAsyncThunk(
    "/services/app/Task/Delete",
    async (id: number) => {
        const response = { ...(await deleteTaskApi(id)), id };
        return response;
    }
);

export const archiveTask = createAsyncThunk(
    "/services/app/Task/Archive",
    async (id: number) => {
        const response = { ...(await archiveTaskApi(id)), id };
        return response;
    }
);

export const deArchiveTask = createAsyncThunk(
    "/services/app/Task/DeArchive",
    async ({ id }: IDeArchiveTaskReq) => {
        const response = { ...(await deArchiveTaskApi({ id })), id };
        return response;
    }
);
