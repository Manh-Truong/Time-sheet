import { ICreateCustomerRes, ICustomerReq } from '../task/type'
import {
    IActiveProjectReq,
    ICreateProject,
    ICreateProjectRes,
    IDeleteProjectRes,
    IProjectRes,
    IProjectSearch,
} from './type'
import { IUserNotPaggingRes } from '../project/type'
import { IDataError } from '../../utils/ApiError'
import { deleteApi, getApi, postApi } from '../../utils/ApiHelpers'


export const getProjectApi = async ({ status, search }: IProjectSearch) => {
    let url = `/services/app/Project/GetAll?`;
    if (typeof status === "number") url += `status=${status}`;
    const res = await getApi<IProjectRes>(url);
    return res;
};

export const getUserNotPaggingApi = async () => {
    const res = await getApi<IUserNotPaggingRes>(
        `/services/app/User/GetUserNotPagging`
    );
    return res;
};

export const getAllCustomerApi = async () => {
    const res = await getApi<ICreateCustomerRes>(`/services/app/Customer/GetAll`);
    return res;
};

export const createCustomerApi = async ({ id, name, address, }: ICustomerReq) => {
    const create = await postApi<ICustomerReq, ICreateCustomerRes | IDataError>(
        `/services/app/Customer/Save`,
        {
            id,
            name,
            address,
        }
    );
    return create;
};

export const createProjectApi = async ({
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
    const data = await postApi<ICreateProject, ICreateProjectRes>(
        `/services/app/Project/Save`,
        {
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
        }
    );
    return data;
};

export const ActiveProjectApi = async ({ id }: IActiveProjectReq) => {
    const data = await postApi<IActiveProjectReq, IDeleteProjectRes>(
        `/services/app/Project/Active?Id=${id}`,
        {
            id,
        }
    );
    return data;
};

export const InactiveProjectApi = async ({ id }: IActiveProjectReq) => {
    const data = await postApi<IActiveProjectReq, IDeleteProjectRes>(
        `/services/app/Project/Inactive?Id=${id}`,
        {
            id,
        }
    );
    return data;
};

export const deleteProjectApi = async (id: number) => {
    let url = `/services/app/Project/Delete?`;
    if (typeof id === "number") url += `Id=${id}`;
    const data = await deleteApi<IDeleteProjectRes>(url);
    return data;
};