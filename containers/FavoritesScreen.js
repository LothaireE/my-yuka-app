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
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesInfos, setFavoritesInfos] = useState();
  const [removeFavorites, setRemoveFavorites] = useState(false);
  const [removeSingleFavorites, setRemoveSingleFavorites] = useState();

  const handleRemoveSingleItem = async (index) => {
    const singleRemove = await AsyncStorage.getItem("favorites");
    const singleRemoveTab = JSON.parse(singleRemove);
    singleRemoveTab.splice(index, 1);
    const singleRemoveToString = JSON.stringify(singleRemoveTab);
    await AsyncStorage.setItem("favorites", singleRemoveToString);
    setRemoveSingleFavorites(singleRemoveToString);
  };

  useEffect(() => {
    const getFavoritesInfos = async () => {
      const infosValue = await AsyncStorage.getItem("favorites");
      const favorites = JSON.parse(infosValue);
      setFavoritesInfos(favorites);

      setIsLoading(false);
    };
    getFavoritesInfos();
  }, [removeFavorites, removeSingleFavorites]);
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
                setRemoveFavorites(true);
              }}
            >
              <Text style={styles.removeBtnText}>Supprimer les favoris</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={favoritesInfos}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.overBlock}>
                  <View style={styles.subBlock}>
                    <View style={styles.binBlock}>
                      <Ionicons
                        name="md-trash-outline"
                        size={24}
                        // color="#757575"
                        style={styles.bin}
                        title="removeSingleFavorite"
                        onPress={() => handleRemoveSingleItem(index)}
                      />
                    </View>
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
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    height: height,
    width: "100%",
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
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  subBlock: {
    width: "100%",
    backgroundColor: "white",
    margin: 10,
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
  binBlock: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bin: {
    marginRight: 20,
    color: "#757575",
  },
});
