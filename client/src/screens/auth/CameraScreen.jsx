import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraDirection, setCameraDirection] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  // invoke as page loads, for camera permission
  useEffect(() => {
    (async function () {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // camera click function
  const clickImageAsync = async () => {
    const data = await camera.takePictureAsync();
    if (route.params.isProfileScreen)
      return navigation.navigate("editProfile", { avatar: data.uri });
    else return navigation.navigate("signup", { avatar: data.uri });
  };

  //image picker
  const imagePickerAsync = async () => {
    const permissionRes =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionRes.granted === false) {
      alert("Permission to access Camera Roll is Required!");
      return;
    }
    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (data.canceled) {
      return;
    }
    if (route.params.isProfileScreen)
      return navigation.navigate("editProfile", { avatar: data.assets[0].uri });
    else return navigation.navigate("signup", { avatar: data.assets[0].uri });
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Camera Permission Required</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={cameraDirection}
        style={{ flex: 1, aspectRatio: 1 }}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />
      <View
        style={{
          height: 60,
          flexDirection: "row",
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button icon="image" onPress={imagePickerAsync}></Button>
        <Button icon="camera-iris" onPress={clickImageAsync}></Button>
        <Button
          icon="sync"
          onPress={() =>
            cameraDirection === CameraType.front
              ? setCameraDirection(CameraType.back)
              : setCameraDirection(CameraType.front)
          }
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
