import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { globalStyle } from "../../../globalstyle";
import { Button, TextInput } from "react-native-paper";
import { styles } from "../auth/authStyles";
import { Task } from "../../components/Task";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { createTask, editTask, getTasks } from "../../redux/action/taskAction";
import { Spinner } from "../../components/Spinner";

export const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskId, setTaskId] = useState(null);
  const { user, loading, message, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  let {
    tasks,
    loading: taskLoading,
    message: taskMessage,
    error: taskError,
  } = useSelector((state) => state.task);
  const createTaskHandler = async (type) => {
    if (type === "edit") {
      await dispatch(editTask(taskId, title, description));
      setTaskId(null);
    } else {
      await dispatch(createTask(title, description));
    }
    setTitle("");
    setDescription("");
    dispatch(getTasks());
  };
  useEffect(() => {
    Toast.show({
      type: "success",
      text1: `Hello ${loading ? "Bro" : user.name}`,
      text2: "How are You Doing",
    });
  }, []);
  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
    }

    if (taskMessage) {
      Toast.show({
        type: "success",
        text1: taskMessage,
      });
    }
    if (taskError) {
      Toast.show({
        type: "error",
        text1: taskError,
      });
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  }, [message, error, taskError, taskMessage]);
  return loading ? (
    <Spinner />
  ) : (
    <View style={{ ...globalStyle.safeView, alignItems: "center" }}>
      <View style={{ ...styles.authContainer }}>
        <Text
          style={{
            letterSpacing: 5,
            marginVertical: 10,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          ADD YOUR TASK
        </Text>
        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Title"}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Description"}
            value={description}
            onChangeText={setDescription}
          />
          <Button
            loading={taskLoading}
            style={styles.btn}
            mode="contained"
            icon={taskId !== null ? "pencil" : "plus"}
            disabled={!title || !description}
            onPress={() => createTaskHandler(taskId !== null ? "edit" : "add")}
          >
            {taskId !== null ? "Edit Task" : "Add Task"}
          </Button>
        </View>
      </View>
      <View
        style={{
          marginBottom: 510,
          width: 400,
          backgroundColor: "#957fbf",
          height: "100%",
        }}
      >
        <ScrollView>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                stateData={{ setTaskId, setTitle, setDescription }}
                task={task}
                key={task._id}
              />
            ))
          ) : (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                paddingHorizontal: 20,
                paddingVertical: "50%",
                color: "#eee",
              }}
            >
              You have not yet created any task
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
