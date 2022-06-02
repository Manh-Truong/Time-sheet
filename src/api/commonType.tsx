export interface IError {
    code: number;
    message: string;
    details: string;
    validationErrors: object;
}

export interface ISearch {
    setSearchKey: (e: string) => void;
}
