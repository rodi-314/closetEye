import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { TouchableOpacity } from 'react-native'

export default function FuncItems({func,onFuncPress}) {
  return (
    <TouchableOpacity onPress={()=> onFuncPress(func)}>
        <View style={{
            padding:10,
            backgroundColor: '#dddaea',
            borderRadius:10,
            marginRight:10,
            marginTop:10,
        }}>
            <Image source={{uri:func.icon}}
            style={{
                width:50,
                height:50
            }}
            />
      </View>
      <Text style={{
        fontSize:10,
        fontFamily:'outfit-medium',
        textAlign:'center',
        marginTop:5,
        width:70
      }}>{func.name}</Text>
    </TouchableOpacity>
  )
}