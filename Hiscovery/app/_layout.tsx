import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {icons} from '../constants'

import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createStackNavigator();

export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const navigation = useNavigation();
  // const [fontsLoaded] = useFonts({
  //   DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
  //   DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
  //   DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  //   MerriweatherBold: require("../assets/fonts/Merriweather-Bold.ttf"),
  //   RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    // <Stack initialRouteName="auth">
    //   <Stack.Screen name="auth" />
    // </Stack>

    // <Stack>
    //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //   <Stack.Screen
    //     name="category-list/index"
    //     options={{
    //       headerShown: true,
    //       title: "Category",
    //       transition: "modal",
    //       gestureDirection: "horizontal",
    //       cardStyleInterpolator: ({ current, layouts }) => {
    //         return {
    //           cardStyle: {
    //             transform: [
    //               {
    //                 translateX: current.progress.interpolate({
    //                   inputRange: [0, 1],
    //                   outputRange: [-layouts.screen.width, 0], // Reverse direction from -width to 0
    //                 }),
    //               },
    //             ],
    //           },
    //         };
    //       },
    //     }}
    //   />

      
    // </Stack> 
    

    <JsStack>
      <JsStack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <JsStack.Screen name="category-list/index"
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          title: "Chuyên mục",
          headerLeft: null, // Remove the default back button
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <icons.arrowRight fill='#222222'/>
            </TouchableOpacity>
          ),
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-layouts.screen.width, 0], // Reverse direction from -width to 0
                    }),
                  },
                ],
              },
            };
          },
        }}/>
    </JsStack>

    
  );
};

export default Layout;