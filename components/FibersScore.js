import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

const FibersScore = ({ fiberNote }) => {
  console.log("fiberNote==", fiberNote);

  // const proteinNote = proteinsNote;

  if (fiberNote <= 1) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{fiberNote} g </Text>
          <Octicons name="primitive-dot" size={24} color="#FC1943" />
        </View>
        <Text style={styles.noteCom}>Mauvais</Text>
      </View>
    );
  } else if (fiberNote > 1 && fiberNote <= 2) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{fiberNote} g </Text>
          <Octicons name="primitive-dot" size={24} color="#FC8C05" />
        </View>
        <Text style={styles.noteCom}>Moyen</Text>
      </View>
    );
  } else if (fiberNote > 2 && fiberNote <= 3) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{fiberNote} g </Text>
          <Octicons name="primitive-dot" size={24} color="#05E474" />
        </View>
        <Text style={styles.noteCom}>Bon</Text>
      </View>
    );
  } else if (fiberNote > 3) {
    return (
      <View style={styles.noteBlock}>
        <View style={styles.note}>
          <Text style={styles.noteResult}>{fiberNote} g </Text>
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
    color: "#757575",
    fontSize: 20,
    lineHeight: 24,
  },
  noteCom: {
    color: "#757575",
  },
  // nutriment: {
  //   color: "#757575",
  //   fontSize: 20,
  //   lineHeight: 24,
  // },
});

export default FibersScore;
