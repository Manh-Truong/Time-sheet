import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";
import {
    createCustomer,
    createProject,
    getAllCustomer,
    getProject,
    getUserNotPagging,
} from '../actions/projectAction'
import { getTask } from '../actions/taskAction'
import { ICreateProject, IProjectReq } from '../../api/project/type'
import { IUserNotPagging } from '../../api/project/type'
import { ICreateCustomerReq, ITaskRequest } from '../../api/task/type'
import { IError } from '../../api/commonType'

export interface ProjectState {
    projects: IProjectReq[];
    createProjects: ICreateProject[];
    users: IUserNotPagging[];
    customers: ICreateCustomerReq[];
    progress: string;
    success: boolean;
    searchName: string;
    error: IError;
    filteredUsers: IUserNotPagging[];
    selectedMembers: IUserNotPagging[];
    tasks: ITaskRequest[];
    viewTask: ITaskRequest[];
    selectedTasks: ITaskRequest[];
    project: ICreateProject;
}

const initialState: ProjectState = {
    projects: [],
    createProjects: [],
    users: [],
    customers: [],
    progress: "",
    success: false,
    searchName: "",
    filteredUsers: [],
    selectedMembers: [],
    tasks: [],
    viewTask: [],
    selectedTasks: [],
    project: {
        name: "",
        code: "",
        status: 0,
        timeStart: "",
        timeEnd: "",
        note: "",
        projectType: 0,
        customerId: 0,
        tasks: [
            {
                taskId: 0,
                billable: false,
                id: 0,
            },
        ],
        users: [
            {
                userId: 0,
                type: 0,
                id: 0,
            },
        ],
        projectTargetUsers: [
            {
                userId: 0,
                roleName: "",
                id: 0,
            },
        ],
        isAllUserBelongTo: false,
        id: 0,
    },
    error: {
        code: 0,
        details: "",
        validationErrors: {},
        message: "",
    },
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        resetProgress(state) {
            state.progress = "";
        },
        resetSuccess(state) {
            state.success = false;
        },
        resetMessage(state) {
            state.error.message = "";
        },
        filter: (state, action) => {
            state.filteredUsers = state.users.filter(
                (user) =>
                    (action.payload.branch === "All" ||
                        user.branch === action.payload.branch) &&
                    (action.payload.level === "All" ||
                        user.level === action.payload.level) &&
                    (action.payload.type === "All" || user.type === action.payload.type)
            );
        },
        pushTask: (state, action: PayloadAction<ITaskRequest>) => {
            state.selectedTasks.push(action.payload);
            state.viewTask = state.viewTask.filter(
                (task) => task.id !== action.payload.id
            );
        },
        removeTask: (state, action: PayloadAction<ITaskRequest>) => {
            state.selectedTasks = state.selectedTasks.filter(
                (task) => task.id !== action.payload.id
            );
            state.viewTask.push(action.payload);
        },
        updateBillable: (state, action: PayloadAction<ITaskRequest>) => {
            state.viewTask = state.viewTask.map((task) => {
                if (task.id === action.payload.id) {
                    task.billable = action.payload.billable;
                }
                return task;
            });
        },
        pushMember: (state, action: PayloadAction<IUserNotPagging>) => {
            state.selectedMembers.push(action.payload);
            state.filteredUsers = state.filteredUsers.filter(
                (user) => user.id !== action.payload.id
            );
        },
        removeMember: (state, action: PayloadAction<IUserNotPagging>) => {
            state.selectedMembers = state.selectedMembers.filter(
                (user) => user.id !== action.payload.id
            );
            state.filteredUsers.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProject.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.progress = "done";
                state.projects = action.payload.result;
            })
            .addCase(getProject.rejected, (state, action) => {
                state.progress = "error";
            });
        builder
            .addCase(getAllCustomer.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(getAllCustomer.fulfilled, (state, action) => {
                state.customers = action.payload.result;
            })
            .addCase(getAllCustomer.rejected, (state, action) => {
                state.progress = "error";
            });
        builder
            .addCase(getUserNotPagging.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(getUserNotPagging.fulfilled, (state, action) => {
                state.users = action.payload.result;
                state.filteredUsers = action.payload.result;
            });
        builder
            .addCase(createCustomer.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.progress = "error";
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.progress = "done";
                const findCustomer = state.customers.find(
                    (customer) => customer.id === action.payload.result.id
                );
                if (findCustomer) {
                    state.customers = state.customers.map((customer) => {
                        if (customer.id === action.payload.result.id) {
                            customer.name = action.payload.result.name;
                            customer.address = action.payload.result.address;
                        }
                        return customer;
                    });
                } else {
                    state.customers.push(action.payload.result);
                }
            });
        builder
            .addCase(createProject.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(createProject.rejected, (state, action) => {
                state.progress = "error";
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.progress = "done";
                const findProject = state.createProjects.find(
                    (project) => project.id === action.payload.result.id
                );
                if (findProject) {
                    state.createProjects = state.createProjects.map((project) => {
                        if (project.id === action.payload.result.id) {
                            project.customerId = action.payload.result.customerId;
                            project.name = action.payload.result.name;
                            project.code = action.payload.result.code;
                            project.timeStart = action.payload.result.timeStart;
                            project.timeEnd = action.payload.result.timeEnd;
                            project.note = action.payload.result.note;
                            project.isAllUserBelongTo = action.payload.result.isAllUserBelongTo;
                            project.projectType = action.payload.result.projectType;
                            project.users = action.payload.result.users;
                            project.tasks = action.payload.result.tasks;
                        }
                        return project;
                    });
                } else {
                    state.createProjects.push(action.payload.result);
                }
            });
        builder
            .addCase(getTask.fulfilled, (state, action) => {
                state.tasks = action.payload.result;
                state.viewTask = action.payload.result;
            })
            .addCase(getTask.pending, (state, action) => {
                state.progress = "pending";
            });

    },
});

const selectSelf = (state: RootState) => state.project;

const getAllProjectSelector = createSelector(selectSelf, (state) => state.projects);

const getAllProjectStatus0 = createSelector(getAllProjectSelector, (projects) =>
    projects && projects.filter((projects) => projects.status === 0)
);

const getAllProjectStatus1 = createSelector(getAllProjectSelector, (projects) =>
    projects && projects.filter((projects) => projects.status === 1)
);

export const projectSelector = {
    getAllProjectSelector,
    getAllProjectStatus0,
    getAllProjectStatus1,
};

export const {
    resetProgress,
    resetSuccess,
    resetMessage,
    filter,
    pushTask,
    removeTask,
    updateBillable,
    pushMember,
    removeMember,
} = projectSlice.actions;

export default projectSlice.reducer;
