import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function ReviewScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Capture</Text>
      <Text style={styles.subtitle}>Confirm the grid before solving.</Text>

      <View style={styles.preview}>
        <Text style={styles.previewText}>Warped Grid Preview Placeholder</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Solve")}
      >
        <Text style={styles.primaryButtonText}>Use This Image</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Camera")}
      >
        <Text style={styles.secondaryButtonText}>Retake</Text>
      </Pressable>

      <Pressable style={styles.linkButton} onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.linkText}>Back Home</Text>
      </Pressable>
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
  preview: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232833",
    backgroundColor: "#131821",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  previewText: {
    color: "#8D98A7",
    fontSize: 14,
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
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: "#4CE1C6",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  linkText: {
    color: "#8D98A7",
    fontSize: 14,
  },
});
