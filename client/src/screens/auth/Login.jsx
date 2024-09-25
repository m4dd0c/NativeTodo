import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { styles } from "./authStyles";
import { globalStyle } from "../../../globalstyle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/authAction.js";
import Toast from "react-native-toast-message";
export const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async() => {
    dispatch(login(email, password));
  };
  const {loading , message, error, path} = useSelector(state=>state.auth)
  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({type: "clearMessage"})
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({type: "clearError"})
    }
  }, [message, error]);
  useEffect(()=> {
    if(path){
      navigation.navigate(path)
      dispatch({type: "clearPath"})
      return;
    }
  },[path])
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
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Password"}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("forgetPassword")}
          >
            <Text
              style={{
                ...styles.link,
                marginVertical: 0,
                marginHorizontal: 0,
              }}
            >
              Forgotten Password ? Reset Now
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            style={styles.btn}
            disabled={!email || !password}
            mode="contained"
            onPress={submitHandler}
            loading={loading}
          >
            Login
          </Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.link}>Don't an Account, Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
