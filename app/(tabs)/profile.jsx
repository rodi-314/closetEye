import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'

export default function profile() {
  return (
    <View style={{
      padding:20,
      marginTop:10
    }}>
      <Text style={{
        fontSize: 35,
        fontFamily:'outfit-bold',
      }}>Profile</Text>

      <UserIntro/>

    </View>
  )
}