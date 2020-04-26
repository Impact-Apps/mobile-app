import React, { useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated
} from "react-native";
import {connect} from "react-redux";
import {getActiveOrders} from "../../orders-store";
import axios from "axios";
import {BASE_API_URL} from "react-native-dotenv";
import Blah from "../../blah";
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { useIsFocused } from '@react-navigation/native';


// todo -> query for my orders which are pending and active
const mapDispatchToProps = (dispatch) =>{
    return {
        getActiveOrders: orders => dispatch(getActiveOrders(orders))

    }
}
const mapStateToProps = (state) =>{
    return {
        orders: state.orders.active,
        order: state.order
    }
}

export const fetchOrders =  async () => {
    // user_id active pending
    const params = {
        filter: {
            userId: 123,
            status: {$in: ["pending", "active"]}
        }
    }
    const response =  await axios.get(`${BASE_API_URL}/order/`, {params})
    return response.data
}


const Updates = (props) => {
    const isFocus = useIsFocused()
    useEffect(  () =>  {
        //todo move to SW.js
        const source = new EventSource('http://localhost:3003/api/events')
        source.onopen = () => console.log('conntected')
        const initialFetch = async () => {
            const response =  await fetchOrders()
            props.getActiveOrders(response)
        }
        source.addEventListener('orderUpdated-123', async () => {
            await initialFetch()
        })
        initialFetch()
    },[])


    return (
        <div>
            {isFocus ? props.orders.map((order, index) => {
                const progress = order.status === 'pending' ? 33 : 66
                const animateFromValue = order.status === 'pending' ? 0 : 33
                return (
                    <AnimatedProgressWheel
                        key={index}
                        progress={progress}
                        animateFromValue={animateFromValue}
                        backgroundColor={'grey'}
                        duration={3000}
                        color={'white'}
                        fullColor={'blue'}
                    />
                )
            }):null}
        </div>
    )
}

const ConnectedUpdates = connect(mapStateToProps, mapDispatchToProps)(Updates)

export default ConnectedUpdates;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 8,
        marginBottom: 8
    },
    itemContainer: {
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        color: "#4099ff",
        margin: 8
    }
});