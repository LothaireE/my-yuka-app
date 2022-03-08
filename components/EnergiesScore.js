import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

const EnergiesScore = ({ energieNote }) => {
  const calories = Math.round(energieNote / 4.18);
  if (calories >= 800) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{calories} kCal </Text>
          <Octicons name="primitive-dot" size={24} color="#FC1943" />
        </View>
        <Text style={styles.noteCom}>Mauvais</Text>
      </View>
    );
  } else if (calories < 600 && calories >= 400) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{calories} kCal </Text>
          <Octicons name="primitive-dot" size={24} color="#FC8C05" />
        </View>
        <Text style={styles.noteCom}>Moyen</Text>
      </View>
    );
  } else if (calories < 400 && calories >= 200) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{calories} kCal </Text>
          <Octicons name="primitive-dot" size={24} color="#05E474" />
        </View>
        <Text style={styles.noteCom}>Bon</Text>
      </View>
    );
  } else if (calories < 200) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{calories} kCal </Text>
          <Octicons name="primitive-dot" size={24} color="#04C752" />
        </View>
        <Text style={styles.noteCom}>Excellent</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  noteBlock: {
    alignItems: "flex-end",
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  noteResult: {
    color: "#757575",
    fontSize: 20,
    lineHeight: 24,
  },
  noteCom: {
    color: "#757575",
  },
});

export default EnergiesScore;
