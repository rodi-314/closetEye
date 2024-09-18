import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop: 150
      }}>
      <Image source={require('./../assets/images/closetEye.png')}
        style={{
            width:300,
            height:300,
        }}
      />
      </View>
      <View style={{
        backgroundColor:'white',
        padding:20
      }}>
        <Text style={{
            fontSize:30,
            fontFamily:'outfit-bold',
            textAlign:'center'
        }}>Your Ultimate 
            <Text style={{
                color:'purple'
            }}> Wardrobe Tracking</Text> Assistant</Text>
        <Text style={{
            fontSize:18,
            fontFamily:'outfit',
            textAlign:'center',
            marginVertical:15,
            color:'#8f8f8f'
        }}> The Insight Your Wardrobe Needs</Text>
        
        <TouchableOpacity style={styles.btn}>
            <Text style={{
                color: 'white',
                fontFamily:'outfit'
            }}>Let's get stated!</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: '#6f5bd5',
        padding:15,
        alignItems:'center',
        borderRadius:99,
        marginTop:100
    }
})