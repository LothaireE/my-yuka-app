import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

const NutriScore = (nutriscore) => {
  const kcal = nutriscore.nutriscore.energy_value / 100;
  const fat = nutriscore.nutriscore.fat_value;
  const fiber = nutriscore.nutriscore.fiber_value;
  const proteins = nutriscore.nutriscore.proteins_value;
  const sugar = nutriscore.nutriscore.sugars_value;

  const result = 100 - Math.floor(kcal + fat + fiber + proteins + sugar);

  if (result <= 25) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{result}/1OO </Text>
          <Octicons name="primitive-dot" size={24} color="#FC1943" />
        </View>
        <Text style={styles.noteCom}>Mauvais</Text>
      </View>
    );
  } else if (result > 25 && result <= 50) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{result}/1OO </Text>
          <Octicons name="primitive-dot" size={24} color="#FC8C05" />
        </View>
        <Text style={styles.noteCom}>Moyen</Text>
      </View>
    );
  } else if (result > 50 && result <= 75) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{result}/1OO </Text>
          <Octicons name="primitive-dot" size={24} color="#05E474" />
        </View>
        <Text style={styles.noteCom}>Bon</Text>
      </View>
    );
  } else if (result > 75 && result <= 100) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{result}/1OO </Text>
          <Octicons name="primitive-dot" size={24} color="#04C752" />
        </View>
        <Text style={styles.noteCom}>Excellent</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  note: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteResult: {
    fontWeight: "700",
    fontSize: 20,
  },
  noteCom: {
    color: "#757575",
  },
});

export default NutriScore;
