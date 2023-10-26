import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-web";
import Settings from "./Setting";
import { useNavigation } from "@react-navigation/native";

function TimeOfDay() {
  var today = new Date();
  var time = today.getHours();
  if (time < 12) {
    return "bad morning";
  } else if (time < 18) {
    return "terrible afternoon";
  } else {
    return "gloomy night";
  }
}

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
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
            <AntDesign
              name="sharealt"
              style={styles.share}
              size={24}
              color="black"
            />
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

          <ScrollView style={[{ paddingLeft: "55%" }, { top: "2%" }]}>
            <Text style={styles.defaulttext}>{TimeOfDay()}</Text>
            <Text style={styles.defaulttext}>{currentDay}</Text>
            <Text style={styles.defaulttext}>{currentMonth}</Text>
            <Text style={[styles.defaulttext, { fontSize: 25 }]}>
              {currentDate}
            </Text>

            <StatusBar style="auto" />
          </ScrollView>
          <View style={styles.cityBox}>
            <Text style={styles.citySelectText}>More Details</Text>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: "100%",
    backgroundColor: "#42adf5",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#42adf5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    fontSize: 55,
    paddingTop: 70,
    textAlign: "center",
    fontFamily: "challenger-font",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 75,
  },
  input: {
    flex: 1,
    fontSize: 25,
    paddingTop: 70,
    fontFamily: "challenger-font",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: "50%",
  },
  cloudgif: {
    flex: 1,
    width: "150%",
    height: "550%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: "35%",
    right: 145,
    opacity: 0.7,
  },
  time: {
    fontSize: 25,
    top: "65%",
    paddingLeft: 25,
    fontFamily: "challenger-font",
    position: "relative",
    alignSelf: "baseline",
  },
  defaulttext: {
    flex: 1,
    width: "55%",
    height: "100%",
    fontSize: 30,
    alignContent: "center",
    textAlign: "right",
    fontFamily: "challenger-font",
    position: "relative",
  },
  settings: {
    top: "65%",
    paddingRight: 25,
    fontFamily: "challenger-font",
    position: "relative",
    alignSelf: "baseline",
  },
  share: {
    top: "65%",
    paddingRight: 25,
    fontFamily: "challenger-font",
    position: "relative",
    alignSelf: "baseline",
  },
  navbox: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "40%",
    backgroundColor: "rgba(49, 158, 232, 0.9)",
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    bottom: 65,
  },

  cityBox: {
    // width: "100%",
    // height: "25%",
    flexDirection: "row",
    backgroundColor: "rgba(49, 158, 232, 0.9)",
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
  },
  citySelectText: {
    flex: 1,
    fontSize: 35,
    fontFamily: "challenger-font",
    position: "relative",
    paddingLeft: "19%",
    paddingTop: 10,
    alignSelf: "baseline",
  },
  cloudgif2: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  navFlex: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  // navImage: {
  //   flex: 3,
  //   width: "100%",
  //   height: "50%",
  //   position: "relative",
  //   alignSelf: "flex-end",
  // },
});
