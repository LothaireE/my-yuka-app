import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./containers/SplashScreen";
import CameraScreen from "./containers/CameraScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import ProductScreen from "./containers/ProductScreen";
import ProductsScreen from "./containers/ProductsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Product" component={ProductScreen} /> */}

        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                unmountOnBlur: true,
              }}
            >
              <Tab.Screen
                name="TabCamera"
                options={{
                  tabBarLabel: "Camera",
                  unmountOnBlur: true,
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Camera"
                      options={{
                        unmountOnBlur: true,
                      }}
                      component={CameraScreen}
                    />
                    {/* {() => <CameraScreen />} */}
                    {/* </Stack.Screen> */}
                    <Stack.Screen name="Product" component={ProductScreen} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              {/* <Stack.Screen name="Product" component={ProductScreen} /> */}

              <Tab.Screen
                name="TabProducts"
                options={{
                  tabBarLabel: "Products",
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Products" component={ProductsScreen}>
                      {/* {() => <ProductsScreen />} */}
                    </Stack.Screen>
                    {/* {() => <ProductScreen />} */}
                    {/* </Stack.Screen> */}
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="TabFavorites"
                options={{
                  tabBarLabel: "Favorites",
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Favorites">
                      {() => <FavoritesScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
