import 'react-native-gesture-handler';
import React, { useState } from "react";
import {View, Button, Alert, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Auth0 from 'react-native-auth0';
import {logoutUser, setUser} from "../../user-store";
import {connect} from "react-redux";
import { CommonActions } from '@react-navigation/native';

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
    // todo add user information to backend
    return {
        user: state.user.auth
    }
}


const Account = (props) => {
    // const [name, setName] = useState('John Doe')
    // const [email, setEmail] = useState(props.user.name)

    const logout =  async () => {
        try {
            console.log('Log out attempt');
            await auth0.webAuth
                .clearSession({})
            props.logoutUser()
            await AsyncStorage.removeItem('accessToken')
            Alert.alert('Logged out!');
            goToLoginRouter()
        }
        catch (e) {
            console.log(e)
        }
    }
    const goToLoginRouter = () => {
        console.log('trying to go to the login router')
        const resetAction = CommonActions.reset({
            index: 0,
            routes:[
                {name: "Login"}
            ]
        });
        props.navigation.dispatch(resetAction);
    }

    return(
        <View style={styles.container}>
            <Button
                onPress={logout}
                title="logout"
                color="#c53c3c"
            />
        </View>
    )

}
const ConnectedLogout = connect(mapStateToProps, mapDispatchToProps)(Account);

export default ConnectedLogout;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 8,
        marginBottom: 8
    }
});
