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
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CameraScreen() {
  const navigation = useNavigation();
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState("Not scanned yet");
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);

  const handleGoBack = () => {
    setModal(false);
    setScanned(false);
  };

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

  useEffect(() => {
    return () => {
      alert("TESTTTT !");
    };
  });

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
      //   console.log(" NEW LOG 2 ===>", response.data.product._id);

      const setProductInfos = async (infos) => {
        try {
          await AsyncStorage.setItem("product", infos);
        } catch (error) {
          console.log(error);
        }
      };
      const infosValue = JSON.stringify({
        _id: response.data.product._id,
        product_picture: response.data.product.image_front_small_url,
        product_name: response.data.product.product_name_fr,
        product_brand: response.data.product.brands,
      });
      setProductInfos(infosValue);

      //   const infosValue = await AsyncStorage.getItem("product");
      //   console.log("infosValue==>", infosValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (permission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting for camera permission</Text>
        {/* <Button
          title="Accéder à l'appareil photo"
          onPress={getPermissionAndTakePicture}
        /> */}
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
      {/* <Text>CameraScreen</Text> */}
      <View style={styles.bareCodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>

      <Text>{id}</Text>

      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}

      <Modal visible={modal} transparent={true} statusBarTranslucent={true}>
        <SafeAreaView style={styles.modalBlock}>
          {data && (
            <View style={styles.productBlock}>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("Product", { id: data.product._id });

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
                  <Text>scoreBlock</Text>
                  {scanned && (
                    <AntDesign
                      name="back"
                      size={40}
                      color="black"
                      onPress={handleGoBack}
                      color="tomato"
                    />
                  )}
                </View>
              </View>
            </View>
          )}
          {/* <Text>{data.product._id}</Text> */}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bareCodeBox: {
    // alignItems: "center",
    // justifyContent: "center",
    // height: "80%",
    width: width,
    overflow: "hidden",
    // borderRadius: 30,
    // backgroundColor: "red",
  },
  scanner: {
    height: height,
    width: width,
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
    backgroundColor: "chartreuse",
  },
});
