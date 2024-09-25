import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import taskReducer from "./reducers/taskReducer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export const SERVER_URI = "https://nativetodo-server.onrender.com/";
