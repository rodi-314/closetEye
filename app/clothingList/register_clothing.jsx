import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import IconPicker from '../functionList/IconPicker';
import { db } from '../../configs/FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";

const getDocId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 20 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

export default function register_clothing() {
  const navigation = useNavigation();
  const [currentIcon, setCurrentIcon] = useState(require('../../assets/images/icons.png'));
  const [iconPath, setIconPath] = useState('icons.png');
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const descriptionLimit = 120; // Set character limit for description

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Register Modules",
      headerStyle: {
        backgroundColor: '#6d5cc4',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: 'outfit-medium'
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Add New Modules</Text>
        <Text style={styles.subtitle}>Fill all the details below to add a new module</Text>
        <TouchableOpacity>
          <Image source={currentIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.iconText}>Take a Picture!</Text>
        <TextInput placeholder='Name' style={styles.textInput} onChangeText={setName}/>
        <TextInput placeholder='Activation Key' style={styles.textInput} onChangeText={setKey}/>
        <TextInput
          placeholder='Description'
          style={[styles.textInput, styles.descriptionInput]} 
          multiline={true}
          numberOfLines={3}
          onChangeText={setDescription}
          maxLength={descriptionLimit}
        />
        <Text style={styles.counterText}>{description.length}/{descriptionLimit}</Text>
        <TouchableOpacity style={styles.addContainer}>
          <Text style={styles.addText}>Add New Clothing</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.inventoryButton} onPress={() => navigation.navigate('inventory')}>
        <Text style={styles.inventoryButtonText}>Go to Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  scrollViewContainer: {
    flexGrow: 1
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  },
  subtitle: {
    fontFamily: 'outfit',
    color: 'grey'
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2
  },
  iconText: {
    fontFamily: 'outfit-medium',
    marginLeft: 13
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: 'white',
    marginTop: 10,
    fontFamily: 'outfit'
  },
  descriptionInput: {
    height: 100
  },
  counterText: {
    alignSelf: 'flex-end',
    fontFamily: 'outfit',
    marginVertical: 5
  },
  addContainer: {
    padding: 15,
    backgroundColor: '#6d5cc4',
    borderRadius: 10,
    marginTop: 20
  },
  addText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: 'white'
  },
  inventoryButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6d5cc4',
    padding: 15,
    borderRadius: 10
  },
  inventoryButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium'
  }
});
