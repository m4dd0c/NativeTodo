import React, { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, getTasks } from "../redux/action/taskAction";
import Toast from "react-native-toast-message";
import { Button } from "react-native-paper";
export const Task = ({ task, stateData }) => {
  const { setTitle, setDescription, setTaskId } = stateData;
  const dispatch = useDispatch();
  const deleteTaskHandler = async () => {
    await dispatch(deleteTask(task._id));
    dispatch(getTasks());
  };
  const editTaskHandler = async () => {
    setTitle(task.title);
    setDescription(task.description);
    setTaskId(task._id);
  };
  const { message, error } = useSelector((state) => state.task);
  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [message, error]);
  return (
    <View style={styles.card}>
      <View style={{ width: "90%" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {task ? task.title : "Title"}
        </Text>
        <Text>
          {task
            ? task.description
            : `
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores,
            animi. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit.Maiores, animi.`}
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Button icon='delete' onPress={deleteTaskHandler}></Button>
        <Button icon='pencil-box-outline' onPress={editTaskHandler}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    backgroundColor: "#f2f2f2",
    marginVertical: 10,
    shadowColor: "rgba(0,0,0,.2)",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
  },
});
