import { View, Text } from 'react-native'
import React from 'react'
import HeaderInv from '../../components/Inventory/HeaderInv'
import ModuleList from '../../components/Inventory/ModuleList'

export default function inventory() {
  return (
    <View>
      <HeaderInv/>
      <ModuleList/>
    </View>
  )
}