import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { styles } from "./authStyles.js";
import { globalStyle } from "../../../globalstyle.js";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/action/authAction.js";
import mime from "mime";
import Toast from "react-native-toast-message";

export const Signup = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params && route.params.avatar) {
      setAvatar(route.params.avatar);
    }
  }, [route]);
  const submitHandler = () => {
    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(signup(userData));
  };
  const { loading, message, error, path } = useSelector((state) => state.auth);
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
 
  useEffect(() => {
    if (path) {
      return navigation.navigate(path);
    }
  }, [path]);
  return (
    <View style={{ ...styles.authParent, ...globalStyle.safeView }}>
      <View style={styles.authContainer}>
        <Text style={{ ...styles.heading, marginBottom: 130 }}>
          Native TODO
        </Text>
        <View style={styles.center}>
          <Avatar.Image
            style={styles.avatar}
            size={100}
            source={{ uri: avatar ? avatar : null }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("camera", { isProfileScreen: false })
            }
          >
            <Text>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Name"}
            value={name}
            onChangeText={setName}
          />
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
        </View>
        <View>
          <Button
            style={styles.btn}
            disabled={!password || !name || !email || !avatar}
            mode="contained"
            loading={loading}
            onPress={submitHandler}
          >
            Signup
          </Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.link}>Have an Account, Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
