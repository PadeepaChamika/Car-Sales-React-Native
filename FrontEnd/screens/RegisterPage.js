import { ImageBackground, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Text, VStack, Input, Button } from "native-base";

export default function RegisterPage({ navigation }) {

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conformPw, setConformPw] = useState("");

  const saveUser = async () => {

    if (fullName != "" && userName != "" && conformPw != "" && password != "") {
      fetch('http://192.168.1.102:4000/users', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName,
          userName: userName,
          password: password,
          conformPw: conformPw
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.status === "500") {
            Alert.alert(json.message);
          } else {
            Alert.alert(json.message);
            clearTextFields();
            navigation.navigate("LoginPage")
          }
        })
        .catch((err) => Alert.alert(err));
    } else {
      Alert.alert("Please fill all the fields and try again.")
    }
  }

  const clearTextFields = () => {
    setFullName("");
    setUserName("");
    setPassword("");
    setConformPw("");
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://images.unsplash.com/photo-1581439645268-ea7bbe6bd091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN1cGVyY2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}>
      <NativeBaseProvider>
        <VStack alignItems='center'>
          <Text bold fontSize="4xl" mt='30%' color='#00FF00' underline >Register Page</Text>
          <Input mx="3" mt='10%' color='white' value={fullName} onChangeText={(e) => { setFullName(e) }} placeholder="Full Name" w="80%" />
          <Input mx="3" mt='5%' color='white' value={userName} onChangeText={(e) => { setUserName(e) }} placeholder="User Name" w="80%" />
          <Input mx="3" mt='5%' color='white' value={password} onChangeText={(e) => { setPassword(e) }} placeholder="Password" w="80%" secureTextEntry={true}/>
          <Input mx="3" mt='5%' color='white' value={conformPw} onChangeText={(e) => { setConformPw(e) }} placeholder="Conform Password" w="80%" secureTextEntry={true} />
          <Button size="lg" variant="subtle" mt="10%" w='50%' borderRadius='30' colorScheme="success" onPress={()=>
                {saveUser()}}>Register</Button>
        </VStack>
      </NativeBaseProvider>
    </ImageBackground>
  )
}