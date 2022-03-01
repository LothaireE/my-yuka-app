import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CameraScreen() {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState("Not scanned yet");
  const [data, setData] = useState();

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
    console.log("id===>", data + type);
    // ********* c'est ici qu'on fait la requete
    try {
      //   const response = await axios.get(`http://localhost:3000/products/${id}`);
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );

      setData(response.data);
      console.log("scanned again===>", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
        {/* <Button
          title="Accéder à l'appareil photo"
          onPress={getPermissionAndTakePicture}
        /> */}
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text>no access to camera</Text>
        <Button
          title="Accéder à l'appareil photo"
          onPress={() => getCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

      {/* <Button
        title="Accéder à l'appareil photo"
        onPress={getCameraPermission()}
      /> */}
    </View>
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
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    // backgroundColor: "red",
  },
});
