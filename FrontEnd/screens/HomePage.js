import React from 'react'
import { NativeBaseProvider, Box, Button, Input, Text } from "native-base";
import { ImageBackground } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <ImageBackground style={{flex:1}} source={{uri:'https://cdn.statusqueen.com/mobilewallpaper/thumbnail/widebody_huracan_-202.jpg'}} >
        <NativeBaseProvider>
            <Text fontSize='5xl' mt='30%' bold ml='10%' color='#00FF00'>Well Come To</Text>
            <Text fontSize='4xl' bold ml='10%' color='#93E96E'>Car Selse Center</Text>
            <Button size="lg" w="50%" ml='25%' borderRadius='20' variant="subtle" mt="80%" colorScheme="success" onPress={()=>
                {navigation.navigate("LoginPage")}}>Get Started</Button>
        </NativeBaseProvider>
    </ImageBackground>
  )
}