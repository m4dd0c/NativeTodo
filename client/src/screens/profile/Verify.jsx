import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../auth/authStyles";
import { Button, TextInput } from "react-native-paper";
import { globalStyle } from "../../../globalstyle";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, verify } from "../../redux/action/authAction";
export const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async () => {
    await dispatch(verify(Number(otp)));
    dispatch(loadUser());
  };
  const { loading, message, error, path } = useSelector((state) => state.auth);
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
            label={"OTP: Verify Yourself"}
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <Text style={{ ...globalStyle.mainColor, margin: 10 }}>
          Enter OTP, You Recieved in Your Email.
        </Text>
        <View>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={submitHandler}
            disabled={!otp}
            loading={loading}
          >
            Verify Account
          </Button>
        </View>
      </View>
    </View>
  );
};
