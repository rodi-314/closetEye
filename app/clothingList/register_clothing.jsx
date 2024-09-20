import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { dbReal, db, storage } from '../../configs/FirebaseConfig';
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { ref as dbRef, set, onValue, off } from 'firebase/database';

const getDocId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 20 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

export default function register_clothing() {
  const navigation = useNavigation();
  const [moduleList, setModuleList] = useState([]);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState('');
  const [moduleLink, setModuleLink] = useState('');
  const [description, setDescription] = useState('');
  const [rfid, setRfid] = useState('');
  const descriptionLimit = 120;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Register Clothing",
      headerStyle: {
        backgroundColor: '#6d5cc4',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: 'outfit-medium'
      }
    });
    getModuleList();
  }, []);

  const onImagePick=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setPic(result?.assets[0].uri);
  }

  const onAddClothing=async()=>{
    const newDocId = getDocId();
    const resp=await fetch(pic);
    const blob=await resp.blob();
    const imageRef = ref(storage,'clothing_image/' + newDocId + '.jpg');
    uploadBytes(imageRef,blob).then((snapshot)=>{
      console.log("File Uploaded...");
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        setPic(downloadUrl);
      })
    });
    
    if (!name || !moduleLink || !pic || !description) {
      Alert.alert('Error', 'Please fill all fields and select an icon!');
      return;
    };

    try {
      const newDocId = getDocId();
      await setDoc(doc(db, 'Clothings', newDocId), {
        name,
        pic,
        moduleLink,
        description,
        rfid
      });
      Alert.alert('Success', 'Module added successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Error adding module!');
    };
  }

  const getModuleList=async()=>{
    setModuleList([])
    const q=query(collection(db,'Modules'));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc)=>{
      setModuleList(prev=>[...prev,{
        label:(doc.data()).key,
        value:(doc.data()).key
      }])
    })
  }

  const getRfid = async () => {
    const registrationRef = dbRef(dbReal, 'registration');
    set(registrationRef, {
      mode: true,
      complete: false
    });
  
    const completeRef = dbRef(dbReal, 'registration/complete');
    onValue(completeRef, (snapshot) => {
      const isComplete = snapshot.val();
      if (isComplete) {
        off(completeRef);
        const tagUidRef = dbRef(dbReal, 'registration/tag_uid');
        onValue(tagUidRef, (snapshot) => {
          const tagUid = snapshot.val();
          setRfid(tagUid.toString());  // This sets the RFID tag into the state
          console.log('Tag UID:', tagUid);  // Previously used for logging
          off(tagUidRef);
        }, { onlyOnce: true });
      }
    });
  };  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{display:'flex', flexDirection:'row',justifyContent: "space-between"}}>
          <View>
            <Text style={styles.title}>Add New Clothes</Text>
            <Text style={styles.subtitle}>Fill all the details below to add a new clothing</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/functionList/register')}>
              <Image
                source={require("./../../assets/images/module.png")}
                style={{
                  height: 50,
                  width: 50,
                  marginTop: 2,
                  marginRight: 3,
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 1,
                }}
              />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=> onImagePick()}>
          {!pic ? <Image source={require('../../assets/images/camera.png')} style={styles.icon} /> :
            <Image source={{uri:pic}} style={styles.icon} />}
        </TouchableOpacity>
        <Text style={styles.iconText}>Take a Picture!</Text>
        <TextInput placeholder='Name' style={styles.textInput} onChangeText={setName}/>
        <View style={styles.textInput}>
          <RNPickerSelect 
            onValueChange={(value) => setModuleLink(value)}
            items={moduleList}
          />
        </View>
        <TextInput
          placeholder='Description'
          style={[styles.textInput, styles.descriptionInput]} 
          multiline={true}
          numberOfLines={3}
          onChangeText={setDescription}
          maxLength={descriptionLimit}
        />
        <View>
        <TextInput
        placeholder='Rfid Tag'
        style={styles.textInput}
        value={rfid}  // This ensures the TextInput displays the current state
        onChangeText={setRfid}  // This updates the state when the user types in the field
      />

          <TouchableOpacity style={styles.scanButton} onPress={()=>getRfid()}>
            <Text style={styles.scanButtonText}>Scan</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.counterText}>{description.length}/{descriptionLimit}</Text>
        <TouchableOpacity style={styles.addContainer} onPress={onAddClothing}>
          <Text style={styles.addText}>Add Clothing</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.inventoryButton} onPress={() => navigation.navigate('inventory')}>
        <Text style={styles.inventoryButtonText}>Go to Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  scrollViewContainer: {
    flexGrow: 1
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  },
  subtitle: {
    fontFamily: 'outfit',
    color: 'grey'
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 2
  },
  iconText: {
    fontFamily: 'outfit-medium',
    marginLeft: 4
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: 'white',
    marginTop: 10,
    fontFamily: 'outfit'
  },
  descriptionInput: {
    height: 100
  },
  counterText: {
    alignSelf: 'flex-end',
    fontFamily: 'outfit',
    marginVertical: 5
  },
  addContainer: {
    padding: 15,
    backgroundColor: '#6d5cc4',
    borderRadius: 10,
    marginTop: 20
  },
  addText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: 'white'
  },
  inventoryButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6d5cc4',
    padding: 15,
    borderRadius: 10
  },
  inventoryButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium'
  },
  scanButton: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: '#6d5cc4',
    padding: 15,
    borderRadius: 10
  },
  scanButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium'
  }
});
