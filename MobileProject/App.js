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
import MainPage from "./MainPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="AppInfo" component={AppInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
