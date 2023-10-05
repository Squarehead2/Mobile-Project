import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import * as React from "react";
import HomePage from "./HomePage";

export default function App() {
  const [loaded] = useFonts({
    "challenger-font": require("./assets/fonts/ChallengerROUGH.ttf"),
  });
  const [tapTrue, setTapTrue] = React.useState(false); // Initialize tapTrue here
  const [gifOpacity, setGifOpacity] = React.useState(0.7);
  const [textOpacity, setTextOpacity] = React.useState(1);
  const [proceedPosition, setProceedPosition] = React.useState(200);

  React.useEffect(() => {
    if (textOpacity > 0 && proceedPosition > -300) {
      const interval = setInterval(() => {
        setProceedPosition(proceedPosition - 0.5);
      }, 1); // Update opacity every 100 milliseconds

      return () => {
        clearInterval(interval); // Clear the interval when component unmounts
      };
    }
  }, [textOpacity, proceedPosition]);

  React.useEffect(() => {
    if (!tapTrue && proceedPosition === -300) {
      setProceedPosition(200);
    }
  }, [tapTrue, proceedPosition]);

  React.useEffect(() => {
    if (tapTrue && gifOpacity > 0) {
      const interval = setInterval(() => {
        setGifOpacity(gifOpacity - 0.1);
      }, 100); // Update opacity every 100 milliseconds

      return () => {
        clearInterval(interval); // Clear the interval when component unmounts
      };
    }
  }, [tapTrue, gifOpacity]);

  React.useEffect(() => {
    if (tapTrue && textOpacity > 0) {
      const interval = setInterval(() => {
        setTextOpacity(textOpacity - 0.1);
      }, 10); // Update opacity every 100 milliseconds

      return () => {
        clearInterval(interval); // Clear the interval when component unmounts
      };
    }
  }, [tapTrue, textOpacity]);

  if (!loaded) {
    return null;
  }

  if (tapTrue) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/Clouds2.gif")}
          style={[styles.cloudgif, { opacity: gifOpacity }]}
        />
        <ScrollView>
          <Text style={styles.header}>Test</Text>
          <Text
            style={[
              styles.input,
              { right: proceedPosition },
              { opacity: textOpacity },
            ]}
            onPress={() => setTapTrue(true)}
          >
            Tap to Proceed
          </Text>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/Clouds2.gif")}
        style={styles.cloudgif}
      />
      <ScrollView>
        <Text style={styles.header} onPress={() => setTapTrue(true)}>
          WACKY WEATHER
        </Text>
        <Text
          style={[styles.input, { right: proceedPosition }]}
          onPress={() => setTapTrue(true)}
        >
          Tap to Proceed
        </Text>
        <StatusBar style="auto" />
      </ScrollView>
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
    bottom: "50%",
  },
  cloudgif: {
    flex: 1,
    width: "150%",
    height: "550%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: "35%",
    right: 145,
    opacity: 0.7,
  },
});
