import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";

export default function MainPage() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const openWeatherKey = `4cf6adcd5a13aae7d15ab91cf82cc941`;
      const lang = "en";
      const units = "metric";
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${units}&appid=${openWeatherKey}`;

      const loadForecast = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setForecast(data);
        } catch (error) {
          Alert.alert("Error", error.message);
        } finally {
          setLoading(false);
        }
      };

      loadForecast();
    }
  }, [location]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Failed to load data</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/Clouds2.gif")}
        style={styles.cloudgif}
      />
      <ScrollView>
        <Text style={styles.header}>Today's Forecast</Text>
        <Text style={styles.location}>
          {forecast.name}, {forecast.sys.country}
        </Text>
        <Text style={styles.temp}>{forecast.main.temp}°C</Text>
        <Text style={styles.description}>
          {forecast.weather[0].description}
        </Text>
        <Text style={styles.feelslike}>
          Feels like {forecast.main.feels_like}°C
        </Text>
        <Text style={styles.humidity}>Humidity: {forecast.main.humidity}%</Text>
        <Text style={styles.wind}>Wind: {forecast.wind.speed} km/h</Text>
        <Text style={styles.pressure}>
          Pressure: {forecast.main.pressure} hPa
        </Text>
        <Text style={styles.visibility}>
          Visibility: {forecast.visibility / 1000} km
        </Text>
        <Text style={styles.sunrise}>
          Sunrise:{" "}
          {new Date(forecast.sys.sunrise * 1000).toLocaleTimeString("en-US")}
        </Text>
        <Text style={styles.sunset}>
          Sunset:{" "}
          {new Date(forecast.sys.sunset * 1000).toLocaleTimeString("en-US")}
        </Text>
        <Text style={styles.timezone}>
          Timezone: {forecast.timezone / 3600} GMT
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.time}>
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </Text>
        <Image
          source={require("./assets/cloudsshort.png")}
          style={styles.navImage}
        />
      </ScrollView>
      <TextInput style={styles.input} placeholder="Location" />
    </View>
  );
}

const styles = StyleSheet.create({});
