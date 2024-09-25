import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export const Footer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Button
        icon="home"
        mode="link"
        onPress={() => navigation.navigate("home")}
      >
        Home
      </Button>
      <Button
        icon="account-outline"
        onPress={() => navigation.navigate("profile")}
      >
        Profile
      </Button>
      <Button
        icon="information-outline"
        onPress={() => navigation.navigate("about")}
      >
        About
      </Button>
    </View>
  );
};
