import { instance } from "./authAction";

export const createTask = (title, description) => async (dispatch) => {
  try {
    dispatch({ type: "createTaskReq" });
    const { data } = await instance.post(
      "/task/",
      { title, description },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "createTaskRes", payload: data });
  } catch (error) {
    dispatch({ type: "createTaskRej", payload: error.response.data.message });
  }
};

export const editTask = (taskId, title, description) => async (dispatch) => {
  try {
    dispatch({ type: "editTaskReq" });
    const { data } = await instance.put(
      `/task/${taskId}`,
      { title, description },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "editTaskRes", payload: data });
  } catch (error) {
    dispatch({ type: "editTaskRej", payload: error.response.data.message });
  }
};

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: "getTaskReq" });
    const { data } = await instance.get("/task/");
    dispatch({ type: "getTaskRes", payload: data });
  } catch (error) {
    dispatch({ type: "getTaskRej", payload: error.response.data.message });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskReq" });
    const { data } = await instance.delete(`/task/${taskId}`);
    dispatch({ type: "deleteTaskRes", payload: data });
  } catch (error) {
    dispatch({ type: "deleteTaskRej", payload: error.response.data.message });
  }
};

export const singleTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "singleTaskReq" });
    const { data } = await instance.get(`/task/${taskId}`);
    dispatch({ type: "singleTaskRes", payload: data });
  } catch (error) {
    dispatch({ type: "singleTaskRej", payload: error.response.data.message });
  }
};
