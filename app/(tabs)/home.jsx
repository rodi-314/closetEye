import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import ClothingAI from '../../components/Home/ClothingAI'
import FuncIcons from '../../components/Home/FuncIcons'

export default function home() {
  return (
    <View>
      <Header/>
      <FuncIcons/>
      <ClothingAI/>
    </View>
  )
}
