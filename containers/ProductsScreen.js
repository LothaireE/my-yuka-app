import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductsScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [productInfos, setProductInfos] = useState();
  const [removeHistory, setRemoveHistory] = useState(false);

  useEffect(() => {
    const getProductInfos = async () => {
      const infosValue = await AsyncStorage.getItem("products");
      const products = JSON.parse(infosValue);
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
          <View style={styles.deleteBtnBlock}>
            <TouchableOpacity
              style={styles.deleteBtn}
              title="removeStorage"
              onPress={async () => {
                await AsyncStorage.removeItem("products");
                // console.log("removeStorage");
                setRemoveHistory(true);
              }}
            >
              <Text style={styles.deleteBtnText}>Supprimer l'historique</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={productInfos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              // console.log("item==>", item);
              return (
                <View style={styles.overBlock}>
                  <View>
                    <TouchableOpacity
                      style={styles.productBlock}
                      onPress={() => {
                        navigation.navigate("Product", { id: item._id });
                      }}
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
                    </TouchableOpacity>
                  </View>
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
  },
  deleteBtnBlock: {
    alignItems: "flex-end",
    width: width,
    marginVertical: 5,
  },

  deleteBtn: {
    flexDirection: "row",
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#5ECD71",
    backgroundColor: "#5ECD71",
    marginRight: 15,
  },
  deleteBtnText: {
    fontWeight: "700",
    color: "white",
  },
  overBlock: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
  productBlock: {
    borderBottomColor: "#A9A9A9",
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 150,
    width: width,
    marginHorizontal: 5,
  },

  productImageBlock: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  productImage: {
    height: 120,
    width: 100,
  },
  productInfoBlock: {
    margin: 10,
    flex: 2,
  },
  productNameText: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 5,
  },
  productBrand: {
    color: "#757575",
    fontSize: 16,
    lineHeight: 20,
  },
});
