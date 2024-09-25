import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { globalStyle } from "../../../globalstyle.js";
import { styles } from "../auth/authStyles.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../../redux/action/authAction.js";
import { Spinner } from "../../components/Spinner.jsx";
import Toast from "react-native-toast-message";
export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
  };
  const { user, loading, message, error, path } = useSelector(
    (state) => state.auth
  );
  const [created, setCreated] = useState(user && user?.createdAt);
  useEffect(() => {
    if (!(user && user.createdAt && user.avatar.url)) {
      dispatch(loadUser());
    }
  }, []);
  useEffect(() => {
    if (user.createdAt) {
      var normalDate = new Date(user.createdAt);
      var normalDateString = normalDate.toString().split('G')[0];
      setCreated(normalDateString);     
    }
  }, []);
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
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  }, [message, error]);
  useEffect(() => {
    if (path) {
      navigation.navigate(path);
      dispatch({ type: "clearPath" });
      return;
    }
  }, [path]);
  return loading ? (
    <Spinner />
  ) : (
    <View style={{ ...styles.authParent, ...globalStyle.safeView }}>
      <Button
        mode="contained-tonal"
        style={{ width: 100, position: "absolute", top: 50, right: 20 }}
        onPress={logoutHandler}
      >
        Logout
      </Button>
      <View style={styles.authContainer}>
        <Text style={{ ...styles.heading, marginBottom: 130 }}>
          Welcome back
        </Text>
        <View style={styles.center}>
          <Avatar.Image
            style={styles.avatar}
            size={150}
            source={{ uri: user ? user?.avatar?.url : null }}
          />
        </View>
        <View>
          <Text style={styles.heading}>{user && user?.name}</Text>
          <Text style={{ ...styles.link, marginVertical: 0, height: 20 }}>
            {user && user?.email}
          </Text>
          <Text style={{ ...styles.link, marginVertical: 0, height: 20 }}>
            createdAt: {user && created}
          </Text>
        </View>
        <View>
          {user && user?.verified !== true && (
            <Button
              style={{ ...styles.btn, width: "100%" }}
              mode="contained"
              onPress={() => navigation.navigate("verify")}
            >
              Verify
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("editProfile")}
          >
            Edit Profile
          </Button>
        </View>
      </View>
    </View>
  );
};
