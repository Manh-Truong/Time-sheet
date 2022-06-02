import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authReducer'
import projectReducer from './reducers/projectReducer'
import taskReducer from './reducers/taskReducer'

const reducer = {
    auth: authReducer,
    task: taskReducer,
    project: projectReducer,
};

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
