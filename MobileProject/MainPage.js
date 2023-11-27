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

const openWeatherKey = `a6277e584c795319d37d6bd88bf2c01d`;
let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

export default function MainPage() {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);

    const { status } = await location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to accesss location was denied! ");
    }

    let location = await location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const response = await fetch(
      `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json();

    if (!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`);
    } else {
      setForecast(data);
    }
    setRefreshing(false);
  };
  useEffect(() => {
    if (!forecast) {
      loadForecast();
    }
  });

  if (!forecast) {
    return (
      <SafeAreaView style={style.loading}>
        <Text>loading</Text>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              loadForecast();
            }}
            refreshing={refreshing}
          />
        }
      >
        <Text style={styles.title}>Current Weather</Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>
            {Math.round(forecast.curren.temp)}°C
          </Text>
        </View>

        <Text style={styles.currentDescription}>{current.description}</Text>
        <View>
          <Text style={styles.subtitle}>Hourly Forecast</Text>
          <FlatList
            horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              return (
                <View style={styles.hour}>
                  <Text>{dt.toLocaleTimeString().replace(/:\d+ /, " ")}</Text>
                  <Text>{Math.round(hour.item.temp)}°C</Text>
                  <Image
                    style={styles.smallIcon}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                    }}
                  />
                  <Text>{weather.description}</Text>
                </View>
              );
            }}
          />
        </View>

        <Text style={styles.subtitle}>Next 7 Days</Text>
        {forecast.daily.slice(0, 7).map((d) => {
          const weather = d.weather[0];
          var dt = new Date(d.dt * 1000);
          return (
            <View style={styles.day} key={d.dt}>
              <Text style={styles.dayTemp}>{Math.round(d.temp.max)}°C</Text>
              <Image
                style={styles.smallIcon}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                }}
              />
              <View style={styles.dayDetails}>
                <Text>{dt.toLocaleDateString}</Text>
                <Text>{weather.description}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title :{
    width: '100',
    textAlign: 'center',
    fontSize: 42,
    fontFamily: "challenger-font",
    color: '#000000',

  },
  subtitle:{
    fontSize: 24,
    marginVertical: 10,
    marginLeft: 2,
    color: '#000000',
    fontFamily: 'challenger-font',
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(49, 158, 232)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading:{
    flex:1,
    backgroundColor: "rgb(49, 158, 232)",
    alignItems: 'center',
    justifyContent: 1,
  },
  current:{
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    fontFamily:'challenger-font',
  },
  currentTemp:{
    fontsize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'challenger-font',
    color: '#000000',
  },
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontsize: 24,
    fontFamily: 'challenger-font',
    marginBottom: 24
    },
    hour: {
      padding: 6,
      alignItems: 'center',
      fontFamily: 'challenger-font',
    },
    day:{
      flexDirection: 'row',
      fontFamily: 'challenger-font'
    },
    dayDetails:{
      justifyContent: 'center',
    },
    dayTemp:{
      marginLeft: 10,
      alignSelf: 'center',
      fontSize: 20,
      fontFamily: 'challenger-font',
      color: '#000000'
    },
    largeIcon: {
      width: 250,
      height: 200,
    },
    smallIcon: {
      width: 100,
      height: 100,    
    },
  
});





