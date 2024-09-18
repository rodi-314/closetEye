import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({strategy: "oauth_google"});

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive} =
            await startOAuthFlow();

            if (createdSessionId){
                setActive({session: createdSessionId});
            } else {
                // use signin or signup for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

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
        
        <TouchableOpacity style={styles.btn}
        onPress={onPress}
        >
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