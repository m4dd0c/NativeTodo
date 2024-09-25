import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/home/Home";
import { Profile } from "./screens/profile/Profile";
import { EditProfile } from "./screens/profile/EditProfile";
import { ChangePassword } from "./screens/auth/ChangePassword";
import { ForgetPassword } from "./screens/auth/ForgetPassword";
import { ResetPassword } from "./screens/auth/ResetPassword";
import { Signup } from "./screens/auth/Signup";
import { Login } from "./screens/auth/Login";
import { Footer } from "./components/Footer";
import { CameraScreen } from "./screens/auth/CameraScreen";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action/authAction";
import { Verify } from "./screens/profile/Verify";
import Toast from "react-native-toast-message";
import { About } from "./screens/home/About";
const Stack = createNativeStackNavigator();

export const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const { isAuth, message, error } = useSelector((state) => state.auth);
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
  return (
    <NavigationContainer>
      {/* <Spinner/> */}
      <Stack.Navigator
        initialRouteName={isAuth ? "home" : "signup"}
        screenOptions={{ headerShown: false }}
      >
        {isAuth ? (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="verify" component={Verify} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="editProfile" component={EditProfile} />
            <Stack.Screen name="changePassword" component={ChangePassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="forgetPassword" component={ForgetPassword} />
            <Stack.Screen name="resetPassword" component={ResetPassword} />
          </>
        )}
        <Stack.Screen name="camera" component={CameraScreen} />
        <Stack.Screen name="about" component={About} />
      </Stack.Navigator>
      {isAuth && <Footer />}
    </NavigationContainer>
  );
};
