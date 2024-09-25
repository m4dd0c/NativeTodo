import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { globalStyle } from "../../../globalstyle.js";
import { styles } from "../auth/authStyles.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  editProfile,
  loadUser,
} from "../../redux/action/authAction.js";
import mime from "mime";
import Toast from "react-native-toast-message";

export const EditProfile = ({ navigation, route }) => {
  const { user, loading, message, error , path} = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();
  const submitHandler = async () => {
    const data = new FormData();
    if (name !== user.name) {
      data.append("name", name);
    }
    if (avatar !== user.avatar.url) {
      data.append("avatar", {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split("/").pop(),
      });
    }
    await dispatch(editProfile(data));
    console.log('\n\n success here \n\n');
    dispatch(loadUser());
  };
  const deleteProfile = () => {
    dispatch(deleteUser());
  };
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
    if (route.params && route.params.avatar) {
      setAvatar(route.params.avatar);
    }
  }, [route]);
   
  useEffect(() => {
    if (path) {
      navigation.navigate(path);
      dispatch({type: "clearPath"})
      return;
    }
  }, [path]);
  return (
    <View style={{ ...styles.authParent, ...globalStyle.safeView }}>
      <Button
        mode="contained-tonal"
        style={{ width: 100, position: "absolute", top: 50, right: 20 }}
        onPress={() => navigation.navigate("profile")}
      >
        Cancel
      </Button>
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
              navigation.navigate("camera", { isProfileScreen: true })
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
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            style={{ ...styles.btn, width: "48%" }}
            mode="contained"
            onPress={submitHandler}
            loading={loading}
          >
            Done
          </Button>
          <Button
            style={{ ...styles.btn, width: "48%" }}
            mode="elevated"
            rippleColor={"red"}
            textColor="red"
            onPress={deleteProfile}
          >
            Delete Profile
          </Button>
        </View>
        <Button mode="contained-tonal" onPress={() => navigation.navigate('changePassword')}>Change Password</Button>
      </View>
    </View>
  );
};
