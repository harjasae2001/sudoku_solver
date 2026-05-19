import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function SolveScreen({ navigation }: Props) {
  const grid = useMemo(() => Array.from({ length: 81 }, () => ""), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solve</Text>
      <Text style={styles.subtitle}>Tap a cell to edit digits later.</Text>

      <View style={styles.grid}>
        {grid.map((value, index) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.cellText}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.primaryButtonText}>Solve Puzzle</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Edit Capture</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0B0E12",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E6E8EC",
  },
  subtitle: {
    fontSize: 14,
    color: "#B7BFCC",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#232833",
    backgroundColor: "#131821",
    overflow: "hidden",
  },
  cell: {
    width: "11.11%",
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: "#232833",
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    color: "#E6E8EC",
    fontSize: 12,
  },
  actions: {
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#4CE1C6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
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
});
