import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import icons from "../../app/functionList/icons";
import { TouchableOpacity } from "react-native";

export default function ModuleListCard({ module, onFuncPress }) {
  return (
    <TouchableOpacity onPress={() => onFuncPress(module)}>
      <View style={styles.container}>
        <Image source={icons[module.icon]} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.moduleCompTextTitle}>{module.name}</Text>
          <Text style={styles.moduleCompText}>{module.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 15,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  moduleCompTextTitle: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 5,
    color: "#333",
  },
  moduleCompText: {
    fontFamily: "outfit",
    fontSize: 14,
    color: "#666",
    flexWrap: "wrap",
    textAlign: "justify",
  },
});
