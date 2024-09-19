import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import IconPicker from './iconPicker';

export default function Register() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(require('../../assets/images/icons.png'));

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

  const onIconPick = () => {
    setModalVisible(true);
  };

  const handleIconSelection = (iconUri) => {
    setCurrentIcon(iconUri);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Modules</Text>
      <Text style={styles.subtitle}>Fill all the details below to add a new module</Text>
      <TouchableOpacity onPress={onIconPick}>
        <Image source={currentIcon} style={styles.icon} />
      </TouchableOpacity>
      <IconPicker visible={modalVisible} onIconSelected={handleIconSelection} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  subtitle: {
    fontFamily: 'outfit',
    color: 'grey'
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 20
  }
});
