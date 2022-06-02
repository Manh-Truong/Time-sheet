import { getApi, postApi, deleteApi } from '../../utils/ApiHelpers'
import { IDataError } from '../../utils/ApiError'
import { ICreateTaskReq, IDeArchiveTaskReq, IDeleteTaskRes, ITaskRes } from "./type"

const getTaskApi = async () => {
    const res = await getApi<ITaskRes>(`/services/app/Task/GetAll`);
    return res;
};

export const createTaskApi = async ({ id, name, type }: ICreateTaskReq) => {
    const create = await postApi<ICreateTaskReq, ITaskRes | IDataError>(
        `/services/app/Task/Save`,
        {
            id,
            name,
            type,
        }
    );
    return create;
};

export const deleteTaskApi = async (id: number) => {
    const data = await deleteApi<IDeleteTaskRes>(
        `/services/app/Task/Delete?Id=${id}`
    );
    return data;
};

export const archiveTaskApi = async (id: number) => {
    const data = await deleteApi<IDeleteTaskRes>(
        `/services/app/Task/Archive?Id=${id}`
    );
    return data;
};

export const deArchiveTaskApi = async ({ id }: IDeArchiveTaskReq) => {
    const data = await postApi<IDeArchiveTaskReq, IDeleteTaskRes>(
        `/services/app/Task/DeArchive?Id=${id}`,
        {
            id,
        }
    );
    return data;
};

export default getTaskApi;



