import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';


export const Location = () => {

    const [x, updateLocation] = useState({coords:{longitude:0,latitude:0}})

    useEffect(  () =>  {
        const fetchLocation =  async () => {
            Geolocation.getCurrentPosition(info => {
                console.log(info)
                updateLocation(info)
            });
        }
        fetchLocation()
    },[])

    return (
        <View>
            <Text style={{margin:30}}>Location</Text>
            <Text style={{margin:30}}>{x.coords.latitude}</Text>
            <Text style={{margin:30}}>{x.coords.longitude}</Text>
        </View>
    )
}
