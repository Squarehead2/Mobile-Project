import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
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
      <ImageBackground
        source={require("./assets/Clouds2.gif")}
        style={styles.cloudgif}
      />
      <ScrollView>
        <Text style={styles.header}>WACKY WEATHER</Text>

        <StatusBar style="auto" />
      </ScrollView>
      <TextInput style={styles.input} placeholder="Enter City Name" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#42adf5",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    fontSize: 55,
    paddingTop: 70,
    textAlign: "center",
    fontFamily: "challenger-font",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 75,
  },
  input: {
    flex: 1,
    fontSize: 25,
    paddingTop: 70,
    fontFamily: "challenger-font",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 25,
  },
  cloudgif: {
    flex: 1,
    width: "150%",
    height: "550%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 200,
    right: 145,

    opacity: 0.7,
  },
});
