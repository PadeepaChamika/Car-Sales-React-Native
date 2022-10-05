import { View} from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Text, VStack, Input, Button } from "native-base";

export default function RegisterPage() {

const[fullName,setFullName]=useState("");
const[userName,setUserName]=useState("");
const[password,setPassword]=useState("");
const[conformPw,setConformPw]=useState("");

const register=()=>{
  console.log(fullName+""+userName+""+password+""+conformPw);
}

  return (
    <NativeBaseProvider>
      <VStack alignItems='center'>
      <Text bold fontSize="3xl" mt='30%' color='white' underline >Register Page</Text>
      <Input mx="3" mt='10%' value={fullName} onChangeText={(e)=>{setFullName (e)}} placeholder="Full Name" w="80%" />
        <Input mx="3" mt='5%' value={userName} onChangeText={(e)=>{setUserName (e)}} placeholder="User Name" w="80%" />
        <Input mx="3" mt='5%' value={password} onChangeText={(e)=>{setPassword (e)}} placeholder="Password" w="80%" />
        <Input mx="3" mt='5%' value={conformPw} onChangeText={(e)=>{setConformPw (e)}} placeholder="Conform Password" w="80%" />
        <Button size="md" variant="subtle" mt="10%" colorScheme="secondary" onPress={register}>Register</Button>
      </VStack>
    </NativeBaseProvider>
  )
}