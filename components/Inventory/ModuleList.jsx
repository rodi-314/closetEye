import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import { FlatList } from 'react-native';
import ModuleListCard from './ModuleListCard';

export default function ModuleList() {
    
    const [moduleList,setModuleList] = useState([]);

    useEffect(()=>{
        getModuleList()
    },[]);

    const getModuleList=async()=>{
        setModuleList([])
        const q=query(collection(db,'Modules'));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc) =>{
            console.log(doc.data())
            setModuleList(prev => [...prev, doc.data])
        })
    }

    return (
    <View>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,
            paddingLeft:20,
            paddingTop:20,
            marginBottom:5
        }}>Modules You Own
        </Text> 
        <FlatList
            data = {moduleList}
            renderItem={({item,index}) =>(
                <ModuleListCard
                    module={item}
                    key={index}
                />
            )}
        />
    </View>
  )
}