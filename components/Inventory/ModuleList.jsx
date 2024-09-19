import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ModuleListCard from './ModuleListCard';

export default function ModuleList() {
    
    const [moduleList, setModuleList] = useState([]);

    useEffect(() => {
        getModuleList();
    }, []);

    const getModuleList = async () => {
        const q = query(collection(db, 'Modules'));
        const querySnapshot = await getDocs(q);
        const modules = [];
        querySnapshot.forEach((doc) => {
            const moduleData = doc.data();
            moduleData.id = doc.id; 
            modules.push(moduleData);
        });
        setModuleList(modules);
    }

    return (
        <View style={{
            
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                paddingLeft: 20,
                paddingTop: 20,
                marginBottom: 5
            }}>Modules You Own</Text>
            <FlatList
                data={moduleList}
                renderItem={({ item }) => (
                    <ModuleListCard module={item} key={item.id} />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
