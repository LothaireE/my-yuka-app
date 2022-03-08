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
import FibersScore from "../components/FibersScore";
import EnergiesScore from "../components/EnergiesScore";
import SaturatedFatsScore from "../components/SaturatedFatsScore";
import SugarScore from "../components/SugarScore";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductScreen({ navigation }) {
  const { params } = useRoute();
  const id = params.id;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        // product_proteins: data.product.nutriscore_data.proteins,
        // product_fiber: data.product.nutriscore_data.fiber,
        // product_energy: data.product.nutriscore_data.energy,
        // product_saturated_fat: data.product.nutriscore_data.saturated_fat,
        // product_sugars: data.product.nutriscore_data.sugars,
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
          // product_proteins: data.product.nutriscore_data.proteins,
          // product_fiber: data.product.nutriscore_data.fiber,
          // product_energy: data.product.nutriscore_data.energy,
          // product_saturated_fat: data.product.nutriscore_data.saturated_fat,
          // product_sugars: data.product.nutriscore_data.sugars,
        });
        const favoriteTabToString = JSON.stringify(favoriteTab);
        await AsyncStorage.setItem("favorites", favoriteTabToString);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.productBlock}>
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
                  <ProteinsScore
                    proteinNote={data.product.nutriscore_data.proteins}
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
                <View style={styles.nutrimentValue}>
                  <FibersScore fiberNote={data.product.nutriscore_data.fiber} />
                </View>
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
                <View style={styles.nutrimentValue}>
                  <EnergiesScore
                    energieNote={data.product.nutriscore_data.energy}
                  />
                </View>
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
                <View style={styles.nutrimentValue}>
                  <SaturatedFatsScore
                    saturatedFatsNote={
                      data.product.nutriscore_data.saturated_fat
                    }
                  />
                </View>
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
                <View style={styles.nutrimentValue}>
                  {/* {data.product.nutriscore_data.sugars} */}
                  <SugarScore sugarNote={data.product.nutriscore_data.sugars} />
                </View>
              </View>
            </View>
          ) : (
            console.log("missing data")
          )}
        </View>
        <View style={styles.addToFavBlock}>
          <TouchableOpacity style={styles.favBtn} onPress={handleAddToFavorite}>
            <Text style={styles.favBtnText}>Ajouter au favoris</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  productBlock: {
    height: height,
    width: "95%",
  },
  bareCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    overflow: "hidden",
    borderRadius: 30,
  },

  // ******************** productBlockTop ********************
  productBlockTop: {
    flexDirection: "row",
    alignItems: "center",
    height: 200,
  },
  productImageBlock: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  productInfoBlock: {
    margin: 10,
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
  },

  // ************   productBlockBottom ************

  productBlockBottom: {
    marginVertical: 5,
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
    flex: 4,
    marginBottom: 10,
    borderBottomColor: "#757575",
    borderBottomWidth: 1,
  },
  nutriIcon: {
    justifyContent: "center",
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
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: 30,
  },
  favBtn: {
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderColor: "#323232",
    backgroundColor: "#323232",
    width: "90%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  favBtnText: {
    height: 20,
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
