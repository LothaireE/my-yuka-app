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
import { Ionicons, Feather } from "@expo/vector-icons";

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
                tabBarActiveTintColor: "#5ECD71",
                tabBarInactiveTintColor: "gray",
                unmountOnBlur: true,
              }}
            >
              <Tab.Screen
                name="TabCamera"
                options={{
                  tabBarLabel: "Camera",
                  unmountOnBlur: true,
                  tabBarIcon: () => (
                    <Ionicons name="ios-scan" size={24} color="black" />
                  ),
                }}
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Camera"
                      options={{
                        unmountOnBlur: true,
                      }}
                      // component={CameraScreen}
                    >
                      {() => <CameraScreen {...props} />}
                    </Stack.Screen>
                    {/* <Stack.Screen name="Product" component={ProductScreen} /> */}
                    <Stack.Screen
                      name="Product"
                      options={{
                        title: "Product",
                        headerStyle: { backgroundColor: "#5ECD71" },
                        headerTitleStyle: { color: "white" },
                      }}
                    >
                      {() => <ProductScreen {...props} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              {/* <Stack.Screen name="Product" component={ProductScreen} /> */}

              <Tab.Screen
                name="TabProducts"
                options={{
                  tabBarLabel: "Products",
                  tabBarIcon: () => (
                    <Ionicons name="ios-cart-outline" size={24} color="black" />
                  ),
                }}
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Products"
                      options={{
                        title: "Products",
                        headerStyle: { backgroundColor: "#5ECD71" },
                        headerTitleStyle: { color: "white" },
                      }}
                      component={ProductsScreen}
                    >
                      {/* {() => <ProductsScreen />} */}
                    </Stack.Screen>
                    {/* {() => <ProductScreen />} */}
                    {/* </Stack.Screen> */}
                    {/* <Stack.Screen name="Product" component={ProductScreen} /> */}

                    <Stack.Screen
                      name="Product"
                      options={{
                        title: "Product",
                        headerStyle: { backgroundColor: "#5ECD71" },
                        headerTitleStyle: { color: "white" },
                      }}
                    >
                      {() => <ProductScreen {...props} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="TabFavorites"
                options={{
                  tabBarLabel: "Favorites",
                  tabBarIcon: () => (
                    <Feather name="star" size={24} color="black" />
                  ),
                }}
              >
                {(props) => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Favorites"
                      options={{
                        title: "Favorites",
                        headerStyle: { backgroundColor: "#5ECD71" },
                        headerTitleStyle: { color: "white" },
                      }}
                    >
                      {() => <FavoritesScreen />}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Product"
                      options={{
                        title: "Product",
                        headerStyle: { backgroundColor: "#5ECD71" },
                        headerTitleStyle: { color: "white" },
                      }}
                    >
                      {() => <ProductScreen {...props} />}
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

{
  /* <GoBack onPress={() => NavigationContainer.navigate("Products")} */
}
