import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";
import {
    archiveTask,
    createTask,
    deArchiveTask,
    deleteTask,
    getTask,
} from '../actions/taskAction'
import { ITaskRequest, ITask } from '../../api/task/type'
import { IError } from '../../api/commonType'

export interface TaskState {
    tasks: ITaskRequest[];
    progress: string;
    success: boolean;
    searchName: string;
    error: IError;
    selectTasks: ITask[];
    filterTasks: ITask[];
}

const initialState: TaskState = {
    tasks: [],
    progress: "",
    success: false,
    searchName: "",
    error: {
        code: 0,
        details: "",
        validationErrors: {},
        message: "",
    },
    selectTasks: [],
    filterTasks: []
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setSearchName: (state, action) => {
            state.searchName = action.payload.searchName;
        },
        resetProgress(state) {
            state.progress = "";
        },
        resetSuccess(state) {
            state.success = false;
        },
        resetMessage(state) {
            state.error.message = "";
        },
        pushTask: (state, action: PayloadAction<ITask>) => {
            state.selectTasks.push(action.payload);
            state.filterTasks = state.filterTasks.filter(
                (task) => task.id !== action.payload.id
            );
        },
        removeTask: (state, action: PayloadAction<ITask>) => {
            state.selectTasks = state.selectTasks.filter(
                (task) => task.id !== action.payload.id
            );
            state.filterTasks.push(action.payload);
        },
        updateBillable: (state, action: PayloadAction<ITask>) => {
            state.selectTasks = state.selectTasks.map((task) => {
                if (task.id === action.payload.id) {
                    task.billable = action.payload.billable;
                }
                return task;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTask.fulfilled, (state, action) => {
                state.tasks = action.payload.result;
                state.progress = "done";
            });

        builder
            .addCase(createTask.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.progress = "done";
                const findTask = state.tasks.find(
                    (task) => task.id === action.payload.result.id
                );
                if (findTask) {
                    state.tasks = state.tasks.map((task) => {
                        if (task.id === action.payload.result.id) {
                            task.name = action.payload.result.name;
                            task.type = action.payload.result.type;
                        }
                        return task;
                    });
                } else {
                    state.tasks.push(action.payload.result);
                }
            })
            .addCase(createTask.rejected, (state, action) => {
                state.progress = "error";
            });

        builder
            .addCase(archiveTask.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(archiveTask.fulfilled, (state, action) => {
                state.progress = "done";
                if (action.payload.success === true) {
                    state.tasks = state.tasks.map((task) => {
                        if (task.id === action.payload.id) {
                            task.isDeleted = true;
                        }
                        return task;
                    });
                } else {
                    state.error.message = action.payload.error.message;
                }
            })
            .addCase(archiveTask.rejected, (state, action) => {
                state.progress = "error";
            });

        builder
            .addCase(deArchiveTask.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(deArchiveTask.fulfilled, (state, action) => {
                state.progress = "done";
                if (action.payload.id) {
                    state.tasks = state.tasks.map((task) => {
                        if (task.id === action.payload.id) {
                            task.isDeleted = false;
                        }
                        return task;
                    });
                }
            })
            .addCase(deArchiveTask.rejected, (state, action) => {
                state.progress = "error";
            });

        builder
            .addCase(deleteTask.pending, (state, action) => {
                state.progress = "pending";
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.progress = "done";
                if (action.payload.success === true) {
                    state.tasks = state.tasks.filter(
                        (task) => task.id !== action.payload.id
                    );
                } else {
                    state.error.message = action.payload.error.message;
                    console.log(state.error.message);
                }
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.progress = "error";
            });
    },
});

const selectSelf = (state: RootState) => state.task;

const getAllTaskSelector = createSelector(selectSelf, (state) => state.tasks);

const getCommonTaskSelector = createSelector(getAllTaskSelector, (tasks) =>
    tasks && tasks.filter((task) => task.type === 0)
);

const getOtherTaskSelector = createSelector(getAllTaskSelector, (tasks) =>
    tasks && tasks.filter((task) => task.type === 1)
);

export const taskSelector = {
    getAllTaskSelector,
    getCommonTaskSelector,
    getOtherTaskSelector,
};

export const { resetProgress, resetSuccess, setSearchName, resetMessage } =
    taskSlice.actions;

export default taskSlice.reducer;
