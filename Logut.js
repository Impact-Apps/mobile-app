import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import { Text } from 'react-native';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'impact-apps.eu.auth0.com', clientId: 'In5Sed5tKPvCSPF9Uf13vgZUCOfvcT50' });


export const Logout = () => {

    useEffect(  () =>  {
        console.log('attempting to login')
        const logout =  () => {
            auth0.webAuth
                .clearSession({})
                .then(success => {
                    Alert.alert(
                        'Logged out!'
                    );
                })
                .catch(error => {
                    console.log('Log out cancelled');
                });

        }
        logout()
    },[])

    return(
        <Text>logout</Text>
    )

}
