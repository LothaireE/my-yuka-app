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
import { useRoute, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesInfos, setFavoritesInfos] = useState();
  const [removeFavorites, setRemoveFavorites] = useState(false);

  useEffect(() => {
    const getFavoritesInfos = async () => {
      const infosValue = await AsyncStorage.getItem("favorites");
      // console.log("infosValue==>", infosValue);
      const favorites = JSON.parse(infosValue);
      // console.log("favorites===>", favorites);
      setFavoritesInfos(favorites);

      setIsLoading(false);
    };
    getFavoritesInfos();
  }, [removeFavorites]);
  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollArea}>
        <View>
          <View style={styles.removeFavBlock}>
            <TouchableOpacity
              style={styles.removeBtn}
              title="removeFavorites"
              onPress={async () => {
                await AsyncStorage.removeItem("favorites");
                console.log("removeFavorites");
                setRemoveFavorites(true);
              }}
            >
              <Text style={styles.removeBtnText}>Supprimer les favoris</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={favoritesInfos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              // console.log("item._id==>", item._id);
              return (
                <View style={styles.overBlock}>
                  <View>
                    {/* <TouchableOpacity
                      onPress={handleAddToFavorite}
                      style={{
                        height: 40,
                        width: width,
                        backgroundColor: "cyan",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          height: 20,
                          textAlign: "center",
                          backgroundColor: "red",
                        }}
                      >
                        ajouter au favoris
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.productBlock}
                      onPress={() => {
                        navigation.navigate("Product", { id: item._id });
                      }}
                      // onPress={() =>
                      //   navigation.navigate("TabCamera", {
                      //     screen: "Product",
                      //     params: { id: item._id },
                      //   })
                      // }
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
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>FavoritesScreen</Text>
//     </View>
//   );
//  }
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
  removeFavBlock: {
    alignItems: "flex-end",
    width: width,
    marginVertical: 5,
  },
  removeBtn: {
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
  removeBtnText: {
    fontWeight: "700",
    color: "white",
  },

  overBlock: {
    // borderWidth: 3,
    // borderColor: "yellow",
    // backgroundColor: "cyan",
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
    // backgroundColor: "green",
    flex: 1,
  },
  productImage: {
    height: 120,
    width: 100,
    // backgroundColor: "chartreuse",
  },
  productInfoBlock: {
    margin: 10,
    // borderWidth: 1,
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
