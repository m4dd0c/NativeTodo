import React from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { globalStyle } from "../../globalstyle";
export const Spinner = () => {
  return (
    <View style={{ ...styles.loaderContainer, ...globalStyle.safeView }}>
      <SafeAreaView>
        <View style={styles.elems}>
          <ActivityIndicator animating={true}/>
          <Text style={{ color: "#957fbf", fontWeight: 900, padding: 16 }}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  elems: {
    flexDirection: "row",
  },
});
