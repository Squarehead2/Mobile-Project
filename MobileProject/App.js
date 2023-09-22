import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useFonts } from "expo-font";
import * as React from "react";

export default function App() {
  const [loaded] = useFonts({
    "challenger-font": require("./assets/fonts/ChallengerROUGH.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WACKY WEATHER</Text>
      <TextInput style={styles.input} placeholder="Enter City Name" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42adf5",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    fontSize: 55,
    paddingTop: 70,
    fontFamily: "challenger-font",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 25,
    paddingTop: 70,
    fontFamily: "challenger-font",
    alignItems: "center",
    justifyContent: "center",
  },
});
