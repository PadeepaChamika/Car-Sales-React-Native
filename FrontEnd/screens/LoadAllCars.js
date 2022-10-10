import { FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function LoadAllCars({ navigation, route}) {

    const[userName, setUserName]= useState(route.params.username);

    const[DATA, setDATA]= useState([]);

    useEffect(() => {
        
        fetch(`http://192.168.1.102:4000/cars/loadCars/${userName}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setDATA(json)
            });
    });

    return (
        <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://w0.peakpx.com/wallpaper/241/877/HD-wallpaper-one-plus-mclaren-007-cars-car-never-settle-beast-james-bond.jpg' }}>
        <FlatList
            data={DATA}
            renderItem={({item}) =>
                <TouchableOpacity style={{ borderWidth: 1, marginBottom: '5%', borderColor: 'white' }} onPress={() => {
                    navigation.navigate("UpdateCarDetails", { item });
                }}>
                    <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>{item.date}</Text>
                    <Text style={{ marginBottom: 10 }}>{item.description}</Text>
                    <Text style={{ marginBottom: 10 }}>{item.location}</Text>
                </TouchableOpacity>
            }
        />
        </ImageBackground>
    )
}