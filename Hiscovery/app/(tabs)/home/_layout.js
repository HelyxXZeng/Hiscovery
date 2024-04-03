import { Stack } from "expo-router";
import { Image, View } from "react-native";
import { icons, COLORS } from "../../../constants";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShadowVisible: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="(tabs-top)"
        options={{
          headerLeft: () => <icons.category fill={COLORS.iconColor} />,
          headerTitle: () => (
            <Image
              source={require("../../../assets/images/logo-home.png")}
              style={{
                width: 60,
                height: 60,
                resizeMode: "contain",
              }}
            />
          ),
          headerRight: () => <icons.notification fill={COLORS.iconColor} />,
        }}
      />

      <Stack.Screen
        name="details"
        options={{ headerTitle: "Details", headerBackTitle: "Back" }}
      />
    </Stack>
  );
};

export default HomeLayout;
