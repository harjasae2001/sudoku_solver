import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function CameraScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Text style={styles.previewText}>Camera Preview Placeholder</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Review")}>
        <Text style={styles.primaryButtonText}>Capture</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Back</Text>
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
  },
  secondaryButtonText: {
    color: "#4CE1C6",
    fontSize: 16,
    fontWeight: "600",
  },
});
