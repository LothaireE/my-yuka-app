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

export default function CameraScreen({ setStoredId }) {
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
    // console.log("type===>", type);
    // console.log("id===>", data + type);
    // ********* c'est ici qu'on fait la requete
    try {
      //   const response = await axios.get(`http://localhost:3000/products/${id}`);
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );

      setData(response.data);
      setModal(true);
      console.log(" NEW LOG 2 ===>", response.data.product._id);
      if (response.data.product._id) {
        setStoredId(data.product._id);
      }
      if (response.data.product._id) {
        const storedId = response.data.product._id;
        await AsyncStorage.setItem("storedId", storedId);
        console.log("storedId==>", storedId);
      }
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
          style={{ height: 400, width: 400 }}
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
                      onPress={() => setModal(false)}
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
