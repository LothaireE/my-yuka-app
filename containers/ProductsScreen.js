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
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductsScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [productInfos, setProductInfos] = useState();
  const [removeHistory, setRemoveHistory] = useState(false);
  // console.log("productInfos vol 2 ===>", productInfos);

  useEffect(() => {
    const getProductInfos = async () => {
      const infosValue = await AsyncStorage.getItem("products");
      // console.log("infosValue==>", infosValue);
      const products = JSON.parse(infosValue);
      // console.log("products===>", products);
      setProductInfos(products);

      setIsLoading(false);
    };
    getProductInfos();
  }, [removeHistory]);

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollArea}>
        <View>
          <View>
            <TouchableOpacity
              style
              title="removeStorage"
              onPress={async () => {
                await AsyncStorage.removeItem("products");
                console.log("removeStorage");
                setRemoveHistory(true);
              }}
            >
              <Text>removeStorage</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={productInfos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              // console.log("item==>", item);
              return (
                <View style={styles.productBlock}>
                  <TouchableOpacity
                  // onPress={() => {
                  //   navigation.navigate("Product", { id: item._id });
                  // }}
                  >
                    <View style={styles.productImageBlock}>
                      <Image
                        source={{
                          uri: item.product_picture,
                        }}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </View>

                    <View style={styles.productInfoBlock}>
                      <View style={styles.productTitleBlock}>
                        <Text style={styles.productNameText}>
                          {item.product_name}
                        </Text>
                        <Text style={styles.productBrand}>
                          {item.product_brand}
                        </Text>
                      </View>
                      <View style={styles.scoreBlock}></View>
                    </View>
                    {/* <Text>{item.product_brand}</Text>
                  <Text>{item.product_name}</Text>
                  <Text>{item._id}</Text> */}
                  </TouchableOpacity>
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
    height: height,
    width: width,
    // justifyContent: "center",
  },
  productBlock: {
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    height: "100%",
  },

  productImageBlock: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    flex: 1,
  },
  productImage: {
    height: 120,
    width: 100,
    backgroundColor: "chartreuse",
  },
  productInfoBlock: {
    margin: 10,
    borderWidth: 1,

    flex: 2,
  },
  productNameText: {
    fontWeight: "700",
  },
});
