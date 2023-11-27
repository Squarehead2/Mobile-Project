import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Settings,
} from "react-native";
import { useFonts } from "expo-font";
import * as React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import Setting from "./Setting";
import Preferences from "./Preferences";
import AppInfo from "./AppInfo";

const Stack = createNativeStackNavigator();

export default function App() {
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
