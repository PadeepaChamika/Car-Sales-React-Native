import { ImageBackground, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, VStack, Text, Input, Button } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginPage({ navigation }) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    fetch(`http://192.168.1.102:4000/users/login/${userName}/${password}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length === 0) {
          Alert.alert("Username or password incorrect.Try again!")
        } else {
          clearTextFields()
          Alert.alert("Login Successful.");
          navigation.navigate("AddCarPage"
          ,
          {
            userName: json[0].userName
          }
          );

        }
      })
      .catch((err) => console.log(err));
  }

  clearTextFields = () => {
    setUserName("");
    setPassword("");
  }



  return (
    <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://images.unsplash.com/photo-1581439645268-ea7bbe6bd091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN1cGVyY2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}>
      <NativeBaseProvider>
        <VStack alignItems='center'>
          <Text bold fontSize="4xl" mt='30%' color='#00FF00' underline >Login Page</Text>
          <Input mx="3" mt='5%' color='white' value={userName} onChangeText={(e) => { setUserName(e) }} placeholder="User Name" w="80%" />
          <Input mx="3" mt='5%' color='white' value={password} onChangeText={(e) => { setPassword(e) }} placeholder="Password" w="80%" secureTextEntry={true} />
          <Button size="lg" variant="subtle" mt="10%" w='50%' borderRadius='30' colorScheme="success" onPress={() => { loginUser() }}>Login</Button>
          <VStack display='flex' flexDirection='row' mt='7%'>
            <Text color='white' fontSize='16'>Dont't have an Account ? </Text>
            <TouchableOpacity onPress={() => { navigation.navigate("RegisterPage") }} >
              <Text color='#00FF00' fontSize='16' fontWeight='bold' >SignUp </Text>
            </TouchableOpacity>
            <Text color='white' fontSize='16'>here.. </Text>
          </VStack>
        </VStack>
      </NativeBaseProvider>
    </ImageBackground>
  )
}