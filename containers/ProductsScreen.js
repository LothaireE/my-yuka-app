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
  const [isLoading, setIsLoading] = useState(true);
  const [productInfos, setProductInfos] = useState();
  console.log("productInfos vol 2 ===>", productInfos);
  useEffect(() => {
    const getProductInfos = async () => {
      const infosValue = await AsyncStorage.getItem("product");
      const product = JSON.parse(infosValue);
      setProductInfos([product]);
      setIsLoading(false);
    };
    getProductInfos();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <Text>ProductsScreen : {productInfos.product_name} </Text>
          <Text>ProductsId: {productInfos._id}</Text> */}

          <Text>ça va le faire </Text>
          {/* <Text>id : {productInfos._id}</Text>
          <Text>name : {productInfos.product_name} </Text>
          <Text>pic : {productInfos.product_brand}</Text>
          <Text>brand : {productInfos.product_picture}</Text> */}
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
