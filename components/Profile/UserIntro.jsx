import { View, Text, Image } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { TouchableOpacity } from 'react-native';

export default function UserIntro() {
  
    const {user}=useUser();
    const {signOut}=useAuth();

    return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:200,
    }}>
      <Image source={{uri:user?.imageUrl}} style={{
        width:80,
        height:80,
        borderRadius:99,
      }}/>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20 
      }}>{user?.fullName}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:15
      }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      <TouchableOpacity onPress={()=>signOut()}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#d7d5df',
            padding:5,
            paddingLeft:7,
            paddingRight:7,
            borderRadius:10,
            marginTop:10
        }}>
            <Image source={require('./../../assets/images/logout.png')} style={{
                width:50,
                height:50,
            }}/>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:15,
                marginLeft:10
            }}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}