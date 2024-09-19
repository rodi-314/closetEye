import { View, Text, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import {db} from './../../configs/FirebaseConfig'
import { FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function ClothingAI() {

  const [suggestionList,setSuggestionList] = useState([]);
  useEffect(() => {
    getClothingSuggestion();
  }, []);

  const getClothingSuggestion = async() => {
    setSuggestionList([]);
    const q=query(collection(db, 'clothing_suggestions'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setSuggestionList(prev => [...prev,doc.data()]);
    });
  }
  return (
    <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        paddingLeft:20,
        paddingTop:20,
        marginBottom:5
      }}>Recommended For You</Text>

      <FlatList 
        data={suggestionList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20}}
        renderItem={({item,index}) => (
          <TouchableOpacity>
            <Image source= {{uri:item.imageUrl}}
            style={{
              width:200,
              height:300,
              borderRadius:15,
              marginRight:20
            }}
            />
          </TouchableOpacity>
        )}
      />


    </View>
  )
}