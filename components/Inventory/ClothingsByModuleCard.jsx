import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function ClothingsByModuleCard({clothing}) {
  return (
    <View style={styles.container}>
        <Image source={{uri:clothing.pic}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.moduleCompTextTitle}>{clothing.name}</Text>
          <Text style={styles.moduleCompText}>{clothing.description}</Text>
        </View>
      </View>
  )
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
  