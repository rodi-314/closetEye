import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HeaderInv() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.userArea}>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          placeholder='Find your clothes'
          style={styles.searchInput}
        />
      </View>
      <View style={styles.clothingRecord}>
        <View style={styles.clothingComponent}>
          <Text style={styles.clothingComponentNum}>-</Text>
          <Text style={styles.clothingComponentWords}>Modules</Text>
        </View>
        <View style={styles.clothingComponent}>
          <Text style={styles.clothingComponentNum}>-</Text>
          <Text style={styles.clothingComponentWords}>Clothings</Text>
        </View>
        <View style={styles.clothingComponent}>
          <Text style={styles.clothingComponentNum}>-</Text>
          <Text style={styles.clothingComponentWords}>Outfits</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#6d5cc4',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBottom:10
  },
  userArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
    marginRight: 10
  },
  welcomeText: {
    color: 'white'
  },
  userName: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'outfit-medium'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    fontFamily: 'outfit',
    fontSize: 15,
    flex: 1
  },
  clothingRecord: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  clothingComponent: {
    alignItems: 'center'
  },
  clothingComponentWords: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: 'white'
  },
  clothingComponentNum: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  }
});
