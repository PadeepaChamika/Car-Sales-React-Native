import { View} from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, VStack, Text, Input, Button} from 'native-base'

export default function LoginPage() {

    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    
    const login=()=>{
      console.log(userName+""+password);
    }

  return (
    <NativeBaseProvider>
      <VStack alignItems='center'>
      <Text bold fontSize="3xl" mt='30%' color='white' underline >Login Page</Text>
        <Input mx="3" mt='5%' value={userName} onChangeText={(e)=>{setUserName (e)}} placeholder="User Name" w="80%" />
        <Input mx="3" mt='5%' value={password} onChangeText={(e)=>{setPassword (e)}} placeholder="Password" w="80%" />
        <Button size="md" variant="subtle" mt="10%" colorScheme="secondary" onPress={login}>Login</Button>
      </VStack>
    </NativeBaseProvider>
  )
}