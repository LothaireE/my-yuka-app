import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductsScreen() {
  // const value = await AsyncStorage.getItem("storedId");
  // console.log("value / storedId==>", value);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>ProductsScreen</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,

    // justifyContent: "center",
  },
  scrollArea: {
    height: height,
    width: width,
  },
});
