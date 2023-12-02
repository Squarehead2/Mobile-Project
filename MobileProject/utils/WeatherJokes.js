import { Text } from "react-native";
import React, { useEffect, useState } from "react";

// Assuming other components and imports are here

// Assuming you've structured your JSON files with key-value pairs for jokes under respective categories
const CloudyJokes = require("../assets/displaypagejokes/CloudyJokes.json");
const SunnyJokes = require("../assets/displaypagejokes/SunnyJokes.json");
const RainyJokes = require("../assets/displaypagejokes/RainyJokes.json");
// const HotJokes = require("../assets/displaypagejokes/HotJokes.json");
// const ColdJokes = require("../assets/displaypagejokes/ColdJokes.json");
const ThunderstormJokes = require("../assets/displaypagejokes/ThunderstormJokes.json");
const SnowJokes = require("../assets/displaypagejokes/SnowJokes.json");

export default function WeatherJokes({ style, temp, weather_desc }) {
  const cloudyJokes = CloudyJokes.cloudyDescriptions;
  const sunnyJokes = SunnyJokes.sunnyDescriptions;
  const rainyJokes = RainyJokes.rainyDescriptions;
  //   const hotJokes = HotJokes.hot_jokes;
  //   const coldJokes = ColdJokes.cold_jokes;
  const thunderstormJokes = ThunderstormJokes.thunderstormDescriptions;
  const snowJokes = SnowJokes.snowDescriptions;

  console.log("Cloudy Jokes:", cloudyJokes);
  console.log("Sunny Jokes:", sunnyJokes);
  console.log("Rainy Jokes:", rainyJokes);
  console.log("Thunderstorm Jokes:", thunderstormJokes);
  console.log("Snow Jokes:", snowJokes);

  const [currentJoke, setCurrentJoke] = useState("");

  useEffect(() => {
    let joke = "";
    const weather = weather_desc.toLowerCase(); // Normalize to lowercase for comparison
    const temperature = temp;

    if (weather.includes("thunderstorm")) {
      joke =
        thunderstormJokes[Math.floor(Math.random() * thunderstormJokes.length)];
    } else if (
      weather.includes("clear sky") ||
      weather.includes("few clouds")
    ) {
      joke = sunnyJokes[Math.floor(Math.random() * sunnyJokes.length)];
    } else if (weather.includes("rain") || weather.includes("drizzle")) {
      joke = rainyJokes[Math.floor(Math.random() * rainyJokes.length)];
    } else if (weather.includes("clouds")) {
      joke = cloudyJokes[Math.floor(Math.random() * cloudyJokes.length)];
    } else if (weather.includes("snow")) {
      joke = snowJokes[Math.floor(Math.random() * snowJokes.length)];
    }

    setCurrentJoke(joke);
  }, [temp, weather_desc]);

  return <Text style={style}>{currentJoke}</Text>;
}
