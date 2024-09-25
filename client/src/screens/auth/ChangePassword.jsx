import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./authStyles";
import { Button, TextInput } from "react-native-paper";
import { globalStyle } from "../../../globalstyle";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../redux/action/authAction";
import Toast from "react-native-toast-message";

export const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async () => {
    if (newPassword !== confirmPassword) {
      alert("both password must match");
      return;
    }
    dispatch(changePasswordAction(oldPassword, newPassword));
  };
  const { loading, message, error, path } = useSelector((state) => state.auth);
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
  useEffect(() => {
    if (path) {
      navigation.navigate(path);
      dispatch({ type: "clearPath" });
      return;
    }
  }, [path]);
  return (
    <View style={{ ...styles.authParent, ...globalStyle.safeView }}>
      <View style={styles.authContainer}>
        <Text style={{ ...styles.heading, marginBottom: 130 }}>
          Native TODO
        </Text>
        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Current Password"}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"New Password"}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Confirm Password"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View>
          <Button
            style={styles.btn}
            disabled={!oldPassword || !newPassword || !confirmPassword}
            mode="contained"
            onPress={submitHandler}
            loading={loading}
          >
            Change Password
          </Button>
        </View>
      </View>
    </View>
  );
};
