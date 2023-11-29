import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Feather";
import { getWeatherData } from './api';

export default function MainPage() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);

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
      const fetchData = async () => {
        try {
          const cityName = 'YourCityName'; // Replace with your actual city name
          const apiKey = 'YourAPIKey'; // Replace with your actual OpenWeather API key
          const iconCode = await getWeatherData(cityName, apiKey);
          setWeatherCondition(iconCode);

          const { latitude, longitude } = location.coords;
          const openWeatherKey = `4cf6adcd5a13aae7d15ab91cf82cc941`;
          const lang = "en";
          const units = "metric";
          let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${units}&appid=${openWeatherKey}`;

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

      fetchData();
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
    <SafeAreaView style={styles.container}>
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
        {/* Display weather condition icon */}
        <Icon name={weatherCondition} size={50} color="black" />
        <Image
          source={require("./assets/cloudsshort.png")}
          style={styles.navImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "rgb(49, 158, 232)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(49, 158, 232)",
    alignItems: "center",
    justifyContent: 'center',
  },
  location: {
    fontSize: 18,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  temp: {
    fontSize: 36,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  feelslike: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  humidity: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  wind: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  pressure: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  visibility: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  sunrise: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  sunset: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  timezone: {
    fontSize: 16,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    fontFamily: "challenger-font",
    textAlign: "center",
    marginTop: 20,
  },
  time: {
    fontSize: 18,
    fontFamily: "challenger-font",

    textAlign: "center",
    marginBottom: 20,
  },
  navImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    fontFamily: "challenger-font",
    fontSize: 16,
  },
});
