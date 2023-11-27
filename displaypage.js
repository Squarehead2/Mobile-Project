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
            <Text style={styles.header}>Today's Forecast</Text>
    
            <StatusBar style="auto" />
          </ScrollView>
          <TextInput style={styles.input} placeholder="Location" />
        </View>
      );
    }
