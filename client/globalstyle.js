import { StyleSheet, StatusBar, Platform } from "react-native";
export const globalStyle = StyleSheet.create({
  safeView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainColor: {
    color: "#957fbf",
  },
});
