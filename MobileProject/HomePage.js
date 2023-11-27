"use client";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Animated, // Import Animated
} from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import * as React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import TimeOfDay from "./utils/TimeOfDay";
import styles from "./assets/StyleSheet";

// Get the current time and date
// Get the current time and date
function DateTime() {
  var today = new Date();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return time;
}
function DateDay() {
  var today = new Date();

  var time =
    today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();

  return time;
}

// Import the JSON files
var daysdata = require("./assets/Days.json");
var monthsdata = require("./assets/Months.json");
var days = daysdata.days;
var months = monthsdata.months;

// Get the current day and month
GetMonthName = function () {
  var today = new Date();
  return months[today.getMonth()];
};
GetDayName = function () {
  var today = new Date();
  return days[today.getDay()];
};

// Main App
export default function HomePage() {
  const [slideAnim] = useState(new Animated.Value(0)); // Initial value for slide animation

  const navigation = useNavigation();
  const [loaded] = useFonts({
    "challenger-font": require("./assets/fonts/ChallengerROUGH.ttf"),
  });

  // Variable declarations
  const [tapTrue, setTapTrue] = React.useState(false);
  const [gifOpacity, setGifOpacity] = React.useState(0.7);
  const [textOpacity, setTextOpacity] = React.useState(1);
  const [proceedPosition, setProceedPosition] = React.useState(200);
  const [currentTime, setCurrentTime] = React.useState(DateTime());
  const [currentDate, setCurrentDate] = React.useState(DateDay());
  const [currentDay, setCurrentDay] = React.useState(GetDayName());
  const [currentMonth, setCurrentMonth] = React.useState(GetMonthName());

  // Update the current time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(DateDay());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(GetDayName());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMonth(GetMonthName());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Animations
  React.useEffect(() => {
    if (textOpacity > 0 && proceedPosition > -300) {
      const interval = setInterval(() => {
        setProceedPosition(proceedPosition - 0.8);
      }, 1);

      return () => {
        clearInterval(interval);
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
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [tapTrue, gifOpacity]);

  React.useEffect(() => {
    if (tapTrue && textOpacity > 0) {
      const interval = setInterval(() => {
        setTextOpacity(textOpacity - 0.1);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [tapTrue, textOpacity]);

  if (!loaded) {
    return null;
  }

  // Tap Function to go to HomePage
  if (gifOpacity < 0) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/Clouds2.gif")}
          style={styles.cloudgif2}
          imageStyle={[
            { opacity: 0.7 },
            { width: "350%" },
            { height: "300%" },
            { top: "-100%" },
            { left: "-85%" },
          ]}
        >
          {/* Content that should be displayed on top of the background */}

          <View style={styles.navbox}>
            {/* <View style={styles.navFlex}> */}
            <Text style={styles.time}>{currentTime}</Text>

            <SimpleLineIcons
              name="settings"
              style={styles.settings}
              size={24}
              color="black"
              onPress={() => navigation.navigate("Setting")}
            />
            {/* </View> */}
            {/* <Image
              source={require("./assets/cloudsshort.png")}
              style={styles.navImage}
            /> */}
          </View>

          <ScrollView
            style={[
              { position: "absolute" },
              { paddingLeft: "55%" },
              { top: "2%" },
              {
                top: "33%",
              },
            ]}
          >
            <TimeOfDay style={styles.defaulttext} />
            <Text style={styles.defaulttext}>{currentDay}</Text>
            <Text style={styles.defaulttext}>{currentMonth}</Text>
            <Text style={[styles.defaulttext, { fontSize: 25 }]}>
              {currentDate}
            </Text>

            <StatusBar style="auto" />
          </ScrollView>

          <View style={styles.cityBox}>
            <Text
              style={styles.citySelectText}
              onPress={() => navigation.navigate("MainPage")}
            >
              More Details
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  // Initial Page
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/Clouds2.gif")}
        style={[styles.cloudgif, { opacity: gifOpacity }]}
      />
      <ScrollView>
        <Text
          style={[styles.header, { opacity: textOpacity }]}
          onPress={() => setTapTrue(true)}
        >
          WACKY WEATHER
        </Text>
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
