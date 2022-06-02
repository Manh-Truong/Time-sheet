import { IError } from '../commonType'

export interface ITaskRequest {
    id: number;
    name: string;
    type: number;
    isDeleted: boolean;
    billable?: boolean;
}

export interface ITask {
    name: string;
    type: number;
    billable?: boolean;
    isDeleted: boolean;
    id: number;
}

export interface ITaskRes {
    result: ITaskRequest[];
}

export interface ICreateTaskReq {
    id?: number;
    name: string;
    type: number;
}

export interface IDeleteTaskRes {
    success: boolean;
    error: IError;
}

export interface IDeArchiveTaskReq {
    id: number;
}

export interface ICustomerReq {
    id?: number;
    name: string;
    address: string;
}

export interface ICreateCustomerReq {
    id: number;
    name: string;
    address: string;
}

export interface ICreateCustomerRes {
    result: ICreateCustomerReq[];
}
