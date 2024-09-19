import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function stats() {
  const navigation=useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTitle: "Statistics",
      headerStyle: {
        backgroundColor: '#6d5cc4',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily:'outfit-medium'
      }
    });
  },[]);
  
  return (
    <View>
      <Text style={{
        fontSize: 20,
        fontFamily:'outfit-bold',
        color:'grey',
        textAlign:'center',
        marginTop:'90%'
      }}>No Implementation Done</Text>
    </View>
  )
}