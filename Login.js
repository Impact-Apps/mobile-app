import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import {View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Auth0 from 'react-native-auth0';
import {logoutUser, setUser} from "./stores/user-store";
import {connect} from "react-redux";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import {BASE_API_URL} from "react-native-dotenv";
import { CommonActions } from '@react-navigation/native';
const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;


const auth0 = new Auth0({
    domain: 'impact-apps.eu.auth0.com',
    clientId: 'In5Sed5tKPvCSPF9Uf13vgZUCOfvcT50'
});

const mapDispatchToProps = (dispatch) =>{
    return {
        setUser: user => dispatch(setUser(user)),
        logoutUser: () => dispatch(logoutUser())
    }
}
const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

const getOrCreateUser =  async (auth0Id) => {
    const response =  await axios.post(`${BASE_API_URL}/user`,{
        auth0Id
    })
    return response.data.value
}


const Login = (props) => {
    const [token, updatedToken]= useState('')
    const [hasInitialized, updatedHasInitialized]= useState(false)
    useEffect(()=>{
        const handleToken = async () =>{
            const accessToken = await AsyncStorage.getItem('accessToken')
            if (!!accessToken) await loginUser(accessToken, refreshAccessToken)
            else {
                console.log('logged out')
                updatedHasInitialized(true)
            }
        }
        handleToken()
    },[token])

    const login =  () => {
        auth0
            .webAuth
            .authorize({
                scope: 'openid profile offline_access',
                audience: 'http://order-backend.com',
                device: DeviceInfo.getUniqueId(),
                prompt: 'login'
            })
            .then(async credentials => {
                loginUser(credentials.accessToken)
                try {
                    await AsyncStorage.setItem('accessToken', credentials.accessToken)
                    await AsyncStorage.setItem('refreshToken', credentials.refreshToken)
                    setSessionTimeout(credentials.expiresIn)

                } catch (error) {
                    console.log(error)
                }
            })
            .catch(error => console.log(error))
    }

    const setSessionTimeout = (duration) => {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(
            refreshAccessToken,
            (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
        );
    };

    const loginUser = (accessToken, refreshCallback) => {
        auth0.webAuth.client
            .userInfo({ token: accessToken })
            .then(async auth =>{
                const user = await getOrCreateUser(auth.sub)
                auth.accessToken = accessToken
                props.setUser({auth, user})
                goToMainRouter()
            })
            .catch(refreshCallback)
    }

    const refreshAccessToken = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        auth0
            .auth
            .refreshToken({refreshToken})
            .then(async res => {
                await AsyncStorage.setItem('accessToken', res.accessToken)
                updatedToken(res.accessToken)
                setSessionTimeout(res.expiresIn)
            })
            .catch(error => {
                console.log(error)
                updatedHasInitialized(true)
            });
    }

    const goToMainRouter = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes:[
                {name: "Main"}
            ]
        });
        props.navigation.dispatch(resetAction);
    }

    return(
        <View style={{padding:40}}>
            <Button
                onPress={login}
                title="Login"
                color="#c53c3c"
            />
        </View>
    )

}
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
