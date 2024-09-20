import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../configs/FirebaseConfig';
import { doc, deleteDoc } from "firebase/firestore";

export default function ClothingListCard({ clothing }) {

  
  const handleDelete = async () => {
    Alert.alert(
      "Delete Clothing",
      "Are you sure you want to delete this clothing item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: async () => {
          console.log(clothing)
            try {
              await deleteDoc(doc(db, "Clothings", clothing.id));
              console.log("Clothing item deleted successfully");
            } catch (error) {
              console.error("Error deleting clothing item: ", error);
              Alert.alert("Error", "Failed to delete clothing item.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri:clothing.pic}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.clothingCompTextTitle}>{clothing.name}</Text>
        <Text style={styles.clothingCompText}>{clothing.description}</Text>
      </View>
      <TouchableOpacity style={styles.inventoryButton} onPress={handleDelete}>
        <Text style={styles.inventoryButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1, 
  },
  clothingCompTextTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20, 
    marginBottom: 5,
    color: '#333',
  },
  clothingCompText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap',
    textAlign:'justify'
  },
  inventoryButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#6d5cc4',
    padding: 7,
    borderRadius: 10
  },
  inventoryButtonText: {
    color: 'white',
    fontSize:10,
    fontFamily: 'outfit-medium'
  }
});
