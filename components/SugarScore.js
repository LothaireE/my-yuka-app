import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

const SugarScore = ({ sugarNote }) => {
  if (sugarNote >= 31) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{sugarNote} g </Text>
          <Octicons name="primitive-dot" size={24} color="#FC1943" />
        </View>
        <Text style={styles.noteCom}>Mauvais</Text>
      </View>
    );
  } else if (sugarNote < 31 && sugarNote >= 18) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{sugarNote} g </Text>
          <Octicons name="primitive-dot" size={24} color="#FC8C05" />
        </View>
        <Text style={styles.noteCom}>Moyen</Text>
      </View>
    );
  } else if (sugarNote < 18 && sugarNote >= 9) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{sugarNote} g </Text>
          <Octicons name="primitive-dot" size={24} color="#05E474" />
        </View>
        <Text style={styles.noteCom}>Bon</Text>
      </View>
    );
  } else if (sugarNote < 9) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{sugarNote} g </Text>
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

export default SugarScore;
