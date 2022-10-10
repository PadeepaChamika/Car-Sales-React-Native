import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Box, Image, Text, Input, Button, VStack, HStack } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackground, FlatList, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AddCarPage({ navigation, route }) {

    const[userName, setUserName]=useState(route.params.userName);

    const [photo, setPhoto] = useState("");

    // const [username, setUsername] = useState(route.params.username);
    // console.log(route.params.username);

    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const takePhotoFromCamera = async () => {
        const options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: true,
            presentationStyle: 'popover',
            quality: 1
        }
        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log('User Cancled');
            } else if (res.errorCode) {
                console.log(res.errorMessage);
            } else {
                const data = res.assets[0];
                console.log(data);
                setPhoto(data);
            }
        });
        // setPhoto(result.assets[0].uri);
    }

    const Library = async () => {
        let options = {
            saveToPhotos: true,
            mediaType: 'photo'
        };
        const result = await launchImageLibrary(options)
        setPhoto(result.assets[0])

        console.log(result.assets[0]);

    }

    const createFormData = (photo, body) => {
        const data = new FormData();

        data.append('photo', {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
        });

        console.log(data.uri);

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        console.log(data._parts);

        return data;
    };

    uploadImage = async () => {
        fetch('http://192.168.1.102:4000/cars/save', {
            method: 'POST',
            body: createFormData(photo, {
                username: userName,
                date: date,
                location: location,
                description: description
            }),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
            },

        })
            .then((response) => response.json())
            .then((json) => {
                if(json.status==="200"){
                Alert.alert(json.message)
                clearTextFields();
                navigation.navigate("LoadAllCars",{
                    username:userName
                })
                }else{
                    Alert.alert(json.message);
                }
            })
            .catch((error) => {
                console.log('upload error', error);
                alert('Upload failed!');
            });
    }

    clearTextFields = () => {
        setPhoto("");
        setDate("");
        setLocation("");
        setDescription("");
    }

    return (
        <NativeBaseProvider>
            <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://w0.peakpx.com/wallpaper/241/877/HD-wallpaper-one-plus-mclaren-007-cars-car-never-settle-beast-james-bond.jpg' }}>
                <Image size='2xl' mt='8%' ml='20%' borderWidth='4' borderRadius='4' borderColor='#22D3EE' alt='image' source={{ uri: photo.uri }} />
                <HStack justifyContent='center' space='2' mt='2%'>
                    <TouchableOpacity onPress={() => { Library() }}>
                        <Text color='#00FF00' fontSize='16' fontWeight='bold'>Upload Photo </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        takePhotoFromCamera();
                    }}>
                        <Text ml='10%' color='#00FF00' fontSize='16' fontWeight='bold'  >Camera </Text>
                    </TouchableOpacity>
                </HStack>
                <VStack w='85%' space='3' alignSelf='center'>
                    <Input mt='5%' color='white' value={date} onChangeText={(e) => { setDate(e) }} placeholder={"Date"} />
                    <Input mt='5%' color='white' value={description} onChangeText={(e) => { setDescription(e) }} placeholder={"Discription"} />
                    <Input mt='5%' color='white' value={location} onChangeText={(e) => { setLocation(e) }} placeholder={"Location"} />
                </VStack>
                <Button size="lg" variant="subtle" mt="3%" w='50%' ml='25%' borderRadius='30' colorScheme="success" onPress={() => uploadImage()}>Add Car</Button>
                <VStack display='flex' flexDirection='row' mt='2%' ml='25%'>
                    <Text color='white' fontSize='16'>View All Cars </Text>
                    <TouchableOpacity>
                        <Text color='#00FF00' fontSize='16' fontWeight='bold' underline >Click here.. </Text>
                    </TouchableOpacity>
                </VStack>
            </ImageBackground>
        </NativeBaseProvider>
    )
}

// const styles= StyleSheet.create({
//     imgBck:{
//         borderWidth: 4,
//         borderRadius: 4,
//         borderColor: "#22D3EE"
//     }
// });