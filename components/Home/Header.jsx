import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native';

export default function Header() {
    const {user} = useUser();
  
    return (
    <View style={{
        padding:20,
        paddingTop:40,
        backgroundColor: '#6d5cc4',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15 
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
      }}>
        <Image source={{uri:user?.imageUrl}}
            style={{
                width:45,
                height:45,
                borderRadius:99
            }}
        />
        <View>
            <Text style={{
                color:'white'
            }}>Welcome,</Text>
            <Text style={{
                fontSize:20,
                color:'white',
                fontFamily:'outfit-medium'
            }}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor: 'white',
        padding: 10,
        marginTop:15,
        marginVertical:5,
        borderRadius:8
      }}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput placeholder='Find your friends'
        style={{
            fontFamily:'outfit',
            fontSize:15
        }}/>
      </View>
    </View>
  )
}