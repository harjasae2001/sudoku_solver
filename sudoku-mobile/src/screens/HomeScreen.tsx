import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Solver</Text>
      <Text style={styles.subtitle}>Scan a puzzle or import an image.</Text>

      <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Camera")}>
        <Text style={styles.primaryButtonText}>Scan Sudoku</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Review")}>
        <Text style={styles.secondaryButtonText}>Import Image</Text>
      </Pressable>

      <Text style={styles.helper}>Tip: Use a clear, top-down photo for best results.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0B0E12",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#E6E8EC",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#B7BFCC",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#4CE1C6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#0B0E12",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderColor: "#4CE1C6",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#4CE1C6",
    fontSize: 16,
    fontWeight: "600",
  },
  helper: {
    marginTop: 18,
    color: "#8D98A7",
    fontSize: 13,
  },
});
