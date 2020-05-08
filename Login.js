import 'react-native-gesture-handler';
import React from "react";
import {View, Button, Alert} from 'react-native';
import Auth0 from 'react-native-auth0';
import {logoutUser, setUser} from "./user-store";
import {connect} from "react-redux";
import axios from "axios";
import {BASE_API_URL} from "react-native-dotenv";
const auth0 = new Auth0({ domain: 'impact-apps.eu.auth0.com', clientId: 'In5Sed5tKPvCSPF9Uf13vgZUCOfvcT50', scope: 'openid profile', responseType: 'token id_token'});


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
            .authorize()
            .then(credentials => {
                auth0.webAuth.client
                    .userInfo({ token: credentials.accessToken })
                    .then(auth =>{
                        getOrCreateUser(auth.sub).then((user)=>{
                            props.setUser({auth, user})
                        }

                        )
                    })
            })
            .catch(error => console.log(error));
    }

    const logout =  () => {
        console.log('Log out attempt');
        auth0.webAuth
            .clearSession({})
            .then(success => {
                Alert.alert(
                    'Logged out!'
                );
                props.logoutUser()
            })
            .catch(error => {
                console.log(error);
                console.log('Log out cancelled');
            });

    }

    return(
        <View>
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
