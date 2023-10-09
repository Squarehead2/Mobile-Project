// Settings.js
import React from 'react';
import { useFonts } from "expo-font";
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, View, Text, TextInput, Switch } from 'react-native';

const Settings = () => {
  const [loaded] = useFonts({
    "challenger-font": require("./assets/fonts/ChallengerROUGH.ttf"),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

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
        <Text style={styles.settingLabel}>Preferences</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Help</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>App Info</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>FAQ</Text>
        <AntDesign name="arrowright" size={24} color="black" />
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
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  settingLabel: {
    fontSize: 20,
    marginRight: 10,
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
