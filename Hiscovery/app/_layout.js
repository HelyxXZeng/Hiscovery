import { Stack } from "expo-router";
import { useFonts } from "expo-font";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    MerriweatherBold: require("../assets/fonts/Merriweather-Bold.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="auth">
      <Stack.Screen name="auth" />
    </Stack>
  );
};

export default Layout;
