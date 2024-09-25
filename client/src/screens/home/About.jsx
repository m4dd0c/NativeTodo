import React from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import {Button} from 'react-native-paper'
import logo from "../../../assets/FineArt00.jpg";
export const About = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo ? logo : null} />
      <Text style={styles.title}>Welcome to Todo</Text>
      <Text style={styles.content}>
        The ultimate app for managing your tasks and todos remotely. Todo is
        created by Manish Suthar using React Native, a cutting-edge framework
        for building native mobile apps. With Todo, you can unleash your
        productivity and creativity with these awesome features:
      </Text>
      <Text style={styles.listItem}>
        - Login and access your tasks and todos from anywhere, anytime.
      </Text>
      <Text style={styles.listItem}>
        - Create, edit, delete and mark your tasks and todos as done or undone
        with a few taps.
      </Text>
      <Text style={styles.listItem}>
        - Sync your tasks and todos across your devices using cloud storage and
        never lose your data.
      </Text>
      <Text style={styles.listItem}>
        - Control your authentication settings and change your password or email
        whenever you want.
      </Text>
      <Text style={styles.content}>
        Todo is more than just a task management app. It's a lifestyle. Whether
        you need to plan your day, organize a project, or track your progress,
        Todo empowers you to get things done. Thank you for choosing Todo as
        your partner in success!
      </Text>
      <View style={styles.links}>
        <Button
          icon="instagram"
          size={40}
          onPress={() => Linking.openURL("https://www.instagram.com/m4dd0x_/")}
        ></Button>
        <Button
          icon="github"
          size={40}
          onPress={() => Linking.openURL("https://github.com/m4dd0c/")}
          style={{ marginLeft: 20 }}
        ></Button>
        <Button
          icon="linkedin"
          size={40}
          onPress={() => Linking.openURL("https://www.linkedin.com/in/m4dd0c/")}
          style={{ marginLeft: 20 }}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#957fbf",
    textAlign: "center",
  },
  content: {
    fontSize: 18,
    color: "#333",
    marginVertical: 10,
  },
  listItem: {
    fontSize: 18,
    color: "#333",
    marginVertical: 5,
    marginLeft: 20,
  },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
});
