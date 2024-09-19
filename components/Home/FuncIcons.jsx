import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import {db} from '../../configs/FirebaseConfig'
import FuncItems from './FuncItems';

export default function funcIcons() {
    const [functionList, setFunctionList] = useState([]);
    useEffect(() => {
        getFunctionList()
    }, [])
    const getFunctionList=async() =>{
        setFunctionList([]);
        const q=query(collection(db, 'Functions'));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setFunctionList(prev => [...prev, doc.data()])
        })
    }

  return (
    <View style={{
        display:'flex',
        alignItems:'center'
    }}>
      <FlatList
        data = {functionList}
        horizontal = {true}
        renderItem={({item,index}) =>(
            <FuncItems func={item} key={index} onFuncPress={(func)=>console.log(func)}/>
        )}
      />
    </View>
  )
}