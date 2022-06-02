import { IError } from '../commonType'

export interface IProjectReq {
    customerName: string;
    name: string;
    code: string;
    status: number;
    pms: string[];
    activeMember: number;
    projectType: number;
    timeStart: string;
    timeEnd: string;
    id: number;
}

export interface IGroups {
    [key: string]: IProjectReq[];
    [key: number]: IProjectReq[];
    //[key: string | number]: IProjectReq[];
}

export interface IProjectSearch {
    status?: number;
    search?: string;
}

export interface IProjectRes {
    result: IProjectReq[];
}

export interface ICreateProject {
    name: string;
    code: string;
    status: number;
    timeStart: string;
    timeEnd: string;
    note: string;
    projectType: number;
    customerId: number;
    tasks: {
        taskId: number;
        billable?: boolean;
        id: number;
    }[];
    users: {
        userId: number;
        type?: number;
        id: number;
    }[];
    projectTargetUsers: {
        userId: number;
        roleName: string;
        id: number;
    }[];
    isAllUserBelongTo: boolean;
    id?: number;
}

export interface ICreateProjectRes {
    result: ICreateProject;
}

export interface IActiveProjectReq {
    id: number;
}

export interface IDeleteProjectRes {
    success: boolean;
    error: IError;
}

export interface IEditProject {
    name: string;
    code: string;
    status: number;
    timeStart: string;
    timeEnd: string;
    note: string;
    projectType: number;
    customerId: number;
    tasks: {
        taskId: number;
        billable?: boolean;
        id: number;
    }[];
    users: {
        userId: number;
        type?: number;
        id: number;
    }[];
    projectTargetUsers: {
        userId: number;
        roleName: string;
        id: number;
    }[];
    isAllUserBelongTo: boolean;
}

export interface IEditProjectRes {
    result: IEditProject;
}

export interface IAuthState {
    progress: string;
    user: {
        accessToken: string;
    };
    error: IError;
    success: boolean;
}

export interface IUserNotPagging {
    name: string;
    isActive: boolean;
    type: number;
    jobTitle: string;
    level: number;
    userCode: string;
    avatarPath: string;
    branch: number;
    id: number;
    projectType?: number;
}

export interface IUserNotPaggingRes {
    result: IUserNotPagging[];
}

export interface IUserRes {
    result: IUserNotPagging[];
}