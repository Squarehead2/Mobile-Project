"use client";

import { Text } from "react-native";

import * as React from "react";

import { useEffect, useState } from "react";
// ... other imports ...
const MorningJokes = require("../assets/MorningJokes.json");
const AfternoonJokes = require("../assets/AfterNoonJokes.json");
const NightJokes = require("../assets/NightJokes.json");
// Assuming other components and imports are here

export default function TimeOfDay() {
  style = {
    flex: 1,
    width: "90%",
    height: "100%",
    fontSize: 25,
    justifyContent: "center", // For vertical centering
    alignItems: "center", // For horizontal centering
    alignContent: "center",
    fontFamily: "challenger-font",
    position: "relative",
  };
  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const morningJokes = MorningJokes.morningDescriptions;
  const afternoonJokes = AfternoonJokes.afternoonDescriptions;
  const nightJokes = NightJokes.nightDescriptions;
  const [currentJoke, setCurrentJoke] = useState("");

  useEffect(() => {
    let joke = "";
    var time = currentHour;

    if (time < 12) {
      joke = morningJokes[Math.floor(Math.random() * morningJokes.length)];
    } else if (time >= 12 && time < 18) {
      joke = afternoonJokes[Math.floor(Math.random() * afternoonJokes.length)];
    } else {
      joke = nightJokes[Math.floor(Math.random() * nightJokes.length)];
    }

    setCurrentJoke(joke);
  }, [currentHour]);

  return <Text style={style}>{currentJoke}</Text>;
}
