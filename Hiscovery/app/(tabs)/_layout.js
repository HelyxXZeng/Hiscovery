import { Tabs } from "expo-router";
import { icons } from "../../constants";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#B32751",
        tabBarInactiveTintColor: "#ABABAB",
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: ({ color }) => <icons.house fill={color} />,
        }}
      />

      <Tabs.Screen
        name="watch-later"
        options={{
          tabBarLabel: "Watch Later",
          title: "Watch Later",
          tabBarIcon: ({ color }) => <icons.watchLater fill={color} />,
        }}
      />

      <Tabs.Screen
        name="following"
        options={{
          tabBarLabel: "Following",
          title: "Following",
          tabBarIcon: ({ color }) => <icons.following fill={color} />,
        }}
      />

      <Tabs.Screen
        name="widgets"
        options={{
          tabBarLabel: "Widgets",
          title: "Widgets",
          tabBarIcon: ({ color }) => <icons.widgets fill={color} />,
        }}
      />

      <Tabs.Screen
        name="more-page"
        options={{
          tabBarLabel: "More",
          title: "More",
          tabBarIcon: ({ color }) => <icons.moreHoriz fill={color} />,
        }}
      />
    </Tabs>
  );
}
