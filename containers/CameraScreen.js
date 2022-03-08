import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";

import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NutriScore from "../components/NutriScore";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CameraScreen() {
  const navigation = useNavigation();
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState("Not scanned yet");
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);

  const getCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === `granted`);
    })();
  };

  //permission d'utiliser la camera
  useEffect(() => {
    getCameraPermission();
  }, []);

  //ce qu'il se passe une fois autorisé
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setId(data);

    try {
      //   const response = await axios.get(`http://localhost:3000/products/${id}`);
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );

      setData(response.data);
      setModal(true);

      const historyTabExist = await AsyncStorage.getItem("products");

      if (historyTabExist === null) {
        const newHistoryTab = [];
        newHistoryTab.unshift({
          _id: response.data.product._id,
          product_picture: response.data.product.image_front_small_url,
          product_name: response.data.product.product_name_fr,
          product_brand: response.data.product.brands,
        });
        const newHistoryTabToString = JSON.stringify(newHistoryTab);
        await AsyncStorage.setItem("products", newHistoryTabToString);
      } else {
        const callHistory = await AsyncStorage.getItem("products");
        const rebuiltHistory = JSON.parse(callHistory);

        const idFound = rebuiltHistory.find((product) => {
          if (response.data.product._id === product._id) {
            return true;
          } else {
            return false;
          }
        });

        if (idFound) {
          console.log("product already registered");
        } else {
          console.log("new entry");
          const historyTab = JSON.parse(historyTabExist);
          historyTab.unshift({
            _id: response.data.product._id,
            product_picture: response.data.product.image_front_small_url,
            product_name: response.data.product.product_name_fr,
            product_brand: response.data.product.brands,
          });

          const historyTabToString = JSON.stringify(historyTab);
          await AsyncStorage.setItem("products", historyTabToString);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (permission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </SafeAreaView>
    );
  }

  if (permission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>no access to camera</Text>
        <Button
          title="Accéder à l'appareil photo"
          onPress={() => getCameraPermission()}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bareCodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>
      {data && (
        <Modal
          style={styles.modalToggle}
          animationType="slide"
          visible={modal}
          transparent={true}
          statusBarTranslucent={true}
        >
          <SafeAreaView style={styles.modalBlock}>
            {scanned && (
              <View style={styles.hideModal}>
                <Ionicons
                  name="remove-outline"
                  size={30}
                  color="#757575"
                  onPress={() => {
                    setScanned(false);
                    setModal(false);
                  }}
                />
              </View>
            )}

            <View style={styles.productBlock}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Product", { id: id });
                }}
                style={styles.productImageBlock}
              >
                <Image
                  source={{
                    uri: data.product.image_front_small_url,
                  }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
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
          </SafeAreaView>
        </Modal>
      )}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  bareCodeBox: {
    width: "100%",
    overflow: "hidden",
  },
  scanner: {
    width: width,
    height: "100%",
  },
  modalBlock: {
    marginTop: "130%",
    height: 250,
    borderWidth: 3,
    borderColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
  },

  productBlock: {
    flexDirection: "row",
    height: 200,
  },
  productImageBlock: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  productInfoBlock: {
    margin: 10,
    flex: 2,
  },
  productNameText: {
    fontWeight: "700",
  },

  productImage: {
    height: 120,
    width: 100,
  },
});
