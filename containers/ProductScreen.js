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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductScreen() {
  const { params } = useRoute();
  const id = params.id;
  // console.log("id en params ===>", params);
  // console.log("id en params ===>", id);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log("data.product.product_name_fr ===>", data.product_name_fr);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json`
      );
      setData(response.data);
      setIsLoading(false);
      // console.log("response.data ===>", response.data);
    };

    fetchData();
  }, []);
  // console.log("data.product vol 2 ===>", data.product._keywords);
  return isLoading ? (
    // <Text>lottie view soon</Text>
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> */}
      <View style={styles.scrollArea}>
        <View style={styles.productBlock}>
          <Image
            source={{
              uri: data.product.image_front_small_url,
            }}
            style={styles.productImage}
            resizeMode="contain"
          />
          {/* </TouchableOpacity> */}
          <View style={styles.productInfoBlock}>
            <View style={styles.productTitleBlock}>
              <Text style={styles.productNameText}>
                {data.product.product_name_fr}
              </Text>
              <Text style={styles.productBrand}>{data.product.brands}</Text>
            </View>

            <View style={styles.scoreBlock}>
              <Text>scoreBlock</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text>Qualités</Text>
          </View>
          <View>
            <Text>Bio </Text>

            {data.product._keywords.includes(
              "organic" || "biologique" || "ab" || "bio"
            ) ? (
              <View>
                <Entypo name="check" size={24} color="#78C489" />
                <Text>Produit naturel</Text>
              </View>
            ) : (
              <View>
                <Entypo name="cross" size={24} color="black" />
                <Text>Produit non naturel</Text>
              </View>
            )}

            {/* else {
                  return (
                    <View>
                      <Entypo name="cross" size={24} color="black" />
                      <Text>Produit non naturel</Text>
                    </View>
                  );
                } */}
            {/* ) : (
              <Text>Produit non naturel</Text>
            )} */}

            {/* {data.product.labels === "Organic" ? (
              <View>
                <Entypo name="check" size={24} color="#78C489" />
                <Text>Produit naturel</Text>
              </View>
            ) : (
              <View>
                <Entypo name="cross" size={24} color="black" />
                <Text>Produit non naturel</Text>
              </View>
            )} */}
          </View>
          <View>
            <Text>Protéines </Text>
            <Text>{data.product.nutriscore_data.proteins}</Text>
          </View>
          <View>
            <Text>Fibres</Text>
            <Text>{data.product.nutriscore_data.fiber}</Text>
          </View>
          <View>
            <Text>Calories</Text>
            <Text>{data.product.nutriscore_data.energy}</Text>
          </View>
          <View>
            <Text>Graisses saturées</Text>
            <Text>{data.product.nutriscore_data.saturated_fat}</Text>
          </View>
          <Text>Sucre</Text>
          <Text>{data.product.nutriscore_data.sugars}</Text>
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
  bareCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: width,
    overflow: "hidden",
    borderRadius: 30,
    // backgroundColor: "red",
  },
  modalBlock: {
    marginTop: "130%",
    height: 250,
    borderWidth: 3,
    borderColor: "tomato",
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
  },

  productBlock: {
    borderWidth: 1,
    borderColor: "chartreuse",
    flexDirection: "row",
    alignItems: "center",
    height: 200,
  },
  productImageBlock: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    flex: 1,
  },
  productInfoBlock: {
    margin: 10,
    borderWidth: 1,
    // backgroundColor: "cyan",
    flex: 2,
  },
  productNameText: {
    fontWeight: "700",
  },

  productImage: {
    height: 120,
    width: 100,
    // backgroundColor: "chartreuse",
  },
});

// {scanned && (
//   <AntDesign
//     name="back"
//     size={40}
//     color="black"
//     onPress={() => setModal(false)}
//     color="tomato"
//   />
// )}
