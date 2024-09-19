import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function FuncItems({ func, onFuncPress }) {
  return (
    <TouchableOpacity onPress={() => onFuncPress(func)} style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: func.icon }} style={styles.icon} />
      </View>
      <Text style={styles.itemName}>{func.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginTop: 10,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#dddaea',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  icon: {
    width: 50,
    height: 50,
  },
  itemName: {
    fontSize: 10,
    fontFamily: 'outfit-medium',
    textAlign: 'center',
    marginTop: 5,
    width: 70
  }
});
