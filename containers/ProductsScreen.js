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
      const infosValue = await AsyncStorage.getItem("products");
      console.log("infosValue==>", infosValue);
      const products = JSON.parse(infosValue);
      console.log("products===>", products);
      setProductInfos(products);

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
      <View style={styles.scrollArea}>
        <View>
          <FlatList
            data={productInfos}
            keyExtractor={(item) => item}
            // à decommenter lorsque ma condition isHistoryExit don't push
            // keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              console.log("item==>", item);
              return (
                <View>
                  <Text>{item.product_brand}</Text>
                  <Text>{item.product_name}</Text>
                  <Text>{item._id}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
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
