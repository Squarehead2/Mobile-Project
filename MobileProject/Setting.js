// Settings.js
import React from "react";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Preferences from "./Preferences";
import AppInfo from "./AppInfo";


const Settings = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const [loaded] = useFonts({
    "challenger-font": require("./assets/fonts/ChallengerROUGH.ttf"),
  });

  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.settingItem}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={styles.settingBack}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.settingBack} onPress={() => navigation.goBack()}>
            Back
          </Text>
        </View>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View />

      {/* Add your settings options here */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications:</Text>
        <Switch />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Location Tracking:</Text>
        <Switch />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel} onPress={() => navigateToScreen("Preferences")}>Preferences</Text>
        <AntDesign name="arrowright" size={24} color="black" onPress={() => navigateToScreen("Preferences")} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel} onPress={() => navigateToScreen("AppInfo")}>App Info</Text>
        <AntDesign name="arrowright" size={24} color="black" onPress={() => navigateToScreen("AppInfo")} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#42adf5",
    alignItems: "center",
    paddingTop: 50, // Adjust paddingTop for the header
  },
  header: {
    fontSize: 35, // Reduce the font size
    fontFamily: "challenger-font",
    paddingBottom: 50, // Adjust paddingBottom for the footer
    alignSelf: "center",
  },
  headerContainer: {
    flexDirection: "row",
    paddingBottom: 50, // Adjust paddingBottom for the footer
    alignSelf: "baseline",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    fontFamily: "challenger-font",
  },
  settingBack: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    fontFamily: "challenger-font",
    alignSelf: "baseline",
  },
  settingLabel: {
    fontSize: 20,
    marginRight: 10,
    fontFamily: "challenger-font",
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "challenger-font",
  },
});

export default Settings;
