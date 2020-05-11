import 'react-native-gesture-handler';
import React from "react";
import {View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Auth0 from 'react-native-auth0';
import {logoutUser, setUser} from "./user-store";
import {connect} from "react-redux";
import axios from "axios";
import {BASE_API_URL} from "react-native-dotenv";
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
    const login =  () => {
        auth0
            .webAuth
            .authorize({
                scope: 'openid profile',
                audience: 'http://order-backend.com'
            })
            .then(credentials => {
                auth0.webAuth.client
                    .userInfo({ token: credentials.accessToken })
                    .then(async auth =>{
                        try {
                            await AsyncStorage.setItem('accessToken', credentials.accessToken)

                        } catch (error) {
                            console.log(error)
                        }
                        const user = await getOrCreateUser(auth.sub)
                        auth.accessToken = credentials.accessToken
                        props.setUser({auth, user})
                    })
            })
            .catch(error => console.log(error));
    }

    const logout =  async () => {
        try {
            console.log('Log out attempt');
            await auth0.webAuth
                .clearSession({})
            props.logoutUser()
            await AsyncStorage.removeItem('accessToken')
            Alert.alert('Logged out!');
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <View style={{padding:40}}>
            <Button
                onPress={login}
                title="Login"
                color="#c53c3c"
            />
            <Button
                onPress={logout}
                title="logout"
                color="#c53c3c"
            />
        </View>
    )

}
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
