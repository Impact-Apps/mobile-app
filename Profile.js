import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import { Text } from 'react-native';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'impact-apps.eu.auth0.com', clientId: 'In5Sed5tKPvCSPF9Uf13vgZUCOfvcT50' });


export const Profile = () => {

    useEffect(  () =>  {
        console.log('attempting to login')
        const login =  () => {
            auth0
                .webAuth
                .authorize({scope: 'openid profile email'})
                .then(credentials =>
                    // Successfully authenticated
                    // Store the accessToken
                    console.log(credentials)
                )
                .catch(error => console.log(error));
        }
        login()
    },[])

    return(
        <Text>Login</Text>
    )

}
