import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import FuncItems from './FuncItems';
import { useRouter } from 'expo-router';

export default function CreateOutfit() {
    const [functionList, setFunctionList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getFunctionList();
    }, []);

    const getFunctionList = async () => {
        setFunctionList([]);
        const q = query(collection(db, 'Functions'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setFunctionList(prev => [...prev, doc.data()]);
        });
    };

    const handleFuncPress = (filePath) => {
        router.push('/functionList/' + filePath);
    };

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <FlatList
                data={functionList}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <FuncItems
                        func={item}
                        filePath={item.filePath}
                        onFuncPress={() => handleFuncPress(item.filePath)}
                    />
                )}
            />
        </View>
    );
}
