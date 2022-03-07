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
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  Entypo,
  FontAwesome5,
  Fontisto,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import NutriScore from "../components/NutriScore";
import ProteinsScore from "../components/ProteinsScore";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductScreen({ navigation }) {
  const { params } = useRoute();
  const id = params.id;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log("data.nutriscore_grade ==>", data.product.nutriments);

  const handleAddToFavorite = async () => {
    const favoriteTabExist = await AsyncStorage.getItem("favorites");

    if (favoriteTabExist === null) {
      console.log("new favorite");
      const newFavoriteTab = [];
      newFavoriteTab.unshift({
        _id: id,
        product_picture: data.product.image_front_small_url,
        product_name: data.product.product_name_fr,
        product_brand: data.product.brands,
      });
      const newFavoriteTabToString = JSON.stringify(newFavoriteTab);
      await AsyncStorage.setItem("favorites", newFavoriteTabToString);
    } else {
      console.log("already a favorite");

      const callFavorites = await AsyncStorage.getItem("favorites");
      const rebuiltFavorites = JSON.parse(callFavorites);

      const idFound = rebuiltFavorites.find((favorite) => {
        if (id === favorite._id) {
          return true;
        } else {
          return false;
        }
      });
      if (idFound) {
        console.log("already a favorite 2");
      } else {
        console.log("new favorite 2");
        const favoriteTab = JSON.parse(favoriteTabExist);
        favoriteTab.unshift({
          _id: id,
          product_picture: data.product.image_front_small_url,
          product_name: data.product.product_name_fr,
          product_brand: data.product.brands,
        });
        const favoriteTabToString = JSON.stringify(favoriteTab);
        await AsyncStorage.setItem("favorites", favoriteTabToString);
      }
      // console.log("productscreen idFound ===>", idFound);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json`
      );
      setData(response.data);
      setIsLoading(false);
      // console.log(
      //   "data.nutriscore_grade ==>",
      //   response.data.product.nutriments
      // );
    };

    fetchData();
  }, []);

  // console.log("data.nutriscore_grade ==>", data.product.nutriments);

  return isLoading ? (
    // <Text>lottie view soon</Text>
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.productBlock}>
        <View style={styles.productBlockTop}>
          <Image
            source={{
              uri: data.product.image_front_small_url,
            }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.productInfoBlock}>
            <View style={styles.productTitleBlock}>
              <Text style={styles.productNameText}>
                {data.product.product_name_fr}
              </Text>
              <Text style={styles.productBrand}>{data.product.brands}</Text>
            </View>

            <View style={styles.scoreBlock}>
              <NutriScore nutriscore={data.product.nutriments} />
            </View>
          </View>
        </View>
        <View style={styles.productBlockBottom}>
          <View style={(styles.nutrimentBlock, { marginBottom: 5 })}>
            <Text style={(styles.nutriment, { fontSize: 30 })}>Qualités</Text>
            <Text style={(styles.nutrimentValue, { color: "#757575" })}>
              pour 100g
            </Text>
          </View>

          <View style={styles.nutrimentBlock}>
            <FontAwesome5 style={styles.nutriIcon} name="leaf" size={24} />
            <View style={styles.nutrimentSubBlock}>
              <Text style={styles.nutriment}>Bio </Text>

              {data.product._keywords.includes(
                "organic" || "biologique" || "ab" || "bio"
              ) ? (
                <View style={styles.nutrimentValue}>
                  <Entypo name="check" size={24} color="#78C489" />
                </View>
              ) : (
                <View style={styles.nutrimentValue}>
                  <Entypo name="cross" size={24} color="black" />
                </View>
              )}
            </View>
          </View>

          {data.product.nutriscore_data?.proteins ? (
            <View style={styles.nutrimentBlock}>
              <FontAwesome5 style={styles.nutriIcon} name="fish" size={24} />
              <View style={styles.nutrimentSubBlock}>
                <Text style={styles.nutriment}>Protéines </Text>
                <View style={styles.nutrimentValue}>
                  {/* {data.product.nutriscore_data.proteins} */}
                  <ProteinsScore
                    proteins={data.product.nutriscore_data.proteins}
                  />
                </View>
              </View>
            </View>
          ) : (
            console.log("missing data")
          )}

          {data.product.nutriscore_data?.fiber ? (
            <View style={styles.nutrimentBlock}>
              <MaterialCommunityIcons
                style={styles.nutriIcon}
                name="consolidate"
                size={24}
              />
              <View style={styles.nutrimentSubBlock}>
                <Text style={styles.nutriment}>Fibres </Text>
                <Text style={styles.nutrimentValue}>
                  {data.product.nutriscore_data.fiber}
                </Text>
              </View>
            </View>
          ) : (
            console.log("missing data")
          )}

          {data.product.nutriscore_data?.energy ? (
            <View style={styles.nutrimentBlock}>
              <Octicons style={styles.nutriIcon} name="flame" size={24} />
              <View style={styles.nutrimentSubBlock}>
                <Text style={styles.nutriment}>Calories </Text>
                <Text style={styles.nutrimentValue}>
                  {data.product.nutriscore_data.energy}
                </Text>
              </View>
            </View>
          ) : (
            console.log("missing data")
          )}

          {data.product.nutriscore_data?.saturated_fat ? (
            <View style={styles.nutrimentBlock}>
              <Fontisto style={styles.nutriIcon} name="blood-drop" size={24} />
              <View style={styles.nutrimentSubBlock}>
                <Text style={styles.nutriment}>Graisses saturées </Text>
                <Text style={styles.nutrimentValue}>
                  {data.product.nutriscore_data.saturated_fat}
                </Text>
              </View>
            </View>
          ) : (
            console.log("missing data")
          )}

          {data.product.nutriscore_data?.sugars ? (
            <View style={styles.nutrimentBlock}>
              <MaterialCommunityIcons
                style={styles.nutriIcon}
                name="spoon-sugar"
                size={24}
              />
              <View style={styles.nutrimentSubBlock}>
                <Text style={styles.nutriment}>Sucre </Text>
                <Text style={styles.nutrimentValue}>
                  {data.product.nutriscore_data.sugars}
                </Text>
              </View>
            </View>
          ) : (
            console.log("missing data")
          )}
        </View>
        <View style={styles.addToFavBlock}>
          <TouchableOpacity style={styles.favBtn} onPress={handleAddToFavorite}>
            <Text style={styles.favBtnText}>ajouter au favoris</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.goBackBtn}
          title="Go back"
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackBtnText}>Retour</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  productBlock: {
    height: height,
    // width: width,
    // borderWidth: 3,
    // borderColor: "red",
  },
  bareCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    // width: width,
    overflow: "hidden",
    borderRadius: 30,
    // backgroundColor: "red",
  },

  // ******************** productBlockTop ********************
  productBlockTop: {
    // borderWidth: 1,
    // borderColor: "chartreuse",
    flexDirection: "row",
    alignItems: "center",
    height: 200,
  },
  productImageBlock: {
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "green",
    flex: 1,
  },
  productInfoBlock: {
    margin: 10,
    // borderWidth: 1,
    // borderColor: "green",
    flex: 2,
  },
  productNameText: {
    fontWeight: "700",
    fontSize: 24,
  },

  productBrand: {
    color: "#757575",
  },

  productImage: {
    height: 120,
    width: 100,
    // backgroundColor: "chartreuse",
  },

  // ************   productBlockBottom ************

  productBlockBottom: {
    // borderWidth: 4,
    // borderColor: "red",
    // marginVertical: 5,
  },

  // ************ nutrimentBlock ************
  nutrimentBlock: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },
  nutrimentSubBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 2,
    // borderColor: "black",
    flex: 4,
    marginBottom: 10,
    borderBottomColor: "#757575",
    borderBottomWidth: 1,
    // marginRight: 5,
  },
  nutriIcon: {
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "black",
    flex: 1,
    color: "#757575",
    paddingLeft: 20,
  },
  nutriment: {
    color: "#757575",
    fontSize: 20,
    lineHeight: 24,
  },

  nutrimentValue: {
    color: "#757575",
    fontSize: 16,
    lineHeight: 20,
  },
  addToFavBlock: {
    height: 40,
    width: width,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  // goBackBtn: {
  //   borderWidth: 2,
  // },
  goBackBtnText: {
    fontSize: 20,
  },
  favBtn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#5ECD71",
    backgroundColor: "#5ECD71",
    marginRight: 15,
  },
  favBtnText: {
    height: 20,
    textAlign: "center",
    color: "white",
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
