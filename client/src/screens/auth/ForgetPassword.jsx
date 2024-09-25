import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./authStyles";
import { Button, TextInput } from "react-native-paper";
import { globalStyle } from "../../../globalstyle";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { forgetPassword } from "../../redux/action/authAction";
export const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async () => {
    await dispatch(forgetPassword(email));
    return navigation.navigate("resetPassword");
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
            label={"Email"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Text style={{ ...globalStyle.mainColor, margin: 10 }}>
          An OTP will be sent to your Email Account.
        </Text>
        <View>
          <Button
            style={styles.btn}
            icon={"send"}
            mode="contained"
            onPress={submitHandler}
            disabled={!email}
            loading={loading}
          >
            Send Mail
          </Button>
          <Button
            style={styles.btn}
            onPress={() => navigation.navigate("resetPassword")}
          >
            Already Have an OTP
          </Button>
        </View>
      </View>
    </View>
  );
};
