import { createReducer } from "@reduxjs/toolkit";

const taskReducer = createReducer(
  { loading: false },
  {
    // get tasks
    getTaskReq: (state) => {
      state.loading = true;
    },
    getTaskRes: (state, action) => {
      state.loading = false;
      state.tasks = action.payload.tasks;
    },
    getTaskRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // edit tasks
    editTaskReq: (state) => {
      state.loading = true;
    },
    editTaskRes: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    editTaskRej: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    // create tasks
    createTaskReq: (state) => {
      state.loading = true;
    },
    createTaskRes: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createTaskRej: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    // delete tasks
    deleteTaskReq: (state) => {
      state.loading = true;
    },
    deleteTaskRes: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteTaskRej: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    // single tasks
    singleTaskReq: (state) => {
      state.loading = true;
    },
    singleTaskRes: (state, action) => {
      state.loading = false;
      state.task = action.payload.task;
    },
    singleTaskRej: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    //clear message error
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export default taskReducer;
