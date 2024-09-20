import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import icons from '../../app/functionList/icons'; 
import { TouchableOpacity } from 'react-native';

export default function ClothingListCard({ clothing }) {
  return (
    <TouchableOpacity>
        <View style={styles.container}>
            <Image
            source={{uri:clothing.pic}}
            style={styles.image}
            />
            <View style={styles.textContainer}>
            <Text style={styles.clothingCompTextTitle}>{clothing.name}</Text>
            <Text style={styles.clothingCompText}>{clothing.description}</Text>
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
  }
});
