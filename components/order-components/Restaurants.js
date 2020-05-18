import React, { useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation';
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import RestaurantItem from "./RestaurantItem";
import {connect} from "react-redux";
import { selectRestaurant, fetchRestaurants} from '../../stores/redux';
import axios from 'axios'
import { BASE_API_URL } from 'react-native-dotenv'

const mapDtoP = (dispatch) =>{
  return {
    selectRestaurant: restaurant => dispatch(selectRestaurant(restaurant)),
    fetchRestaurants: restaurants => dispatch(fetchRestaurants(restaurants))
  }
}

const mapStateToProps = (state) =>{
  return {
    restaurants: state.restaurantDetails.restaurants,
    user: state.user
  }
}

const Restaurants = (props) => {

  const [x, updateLocation] = useState({coords:{longitude:0,latitude:0}})

  useEffect(  () =>  {

    const fetchLocation =  async () => {
      Geolocation.getCurrentPosition(info => {
        console.log(info)
        updateLocation(info)
      });
    }
    fetchLocation()

    const fetchRestaurant =  async () => {
      const response =  await axios.get(`${BASE_API_URL}/restaurant`, {
        params: {
          latitude: x.coords.latitude,
          longitude: x.coords.longitude
        }
      })
      props.fetchRestaurants(response.data)
    }
    fetchRestaurant()
  },[])



  const handleNavigation = (restaurant) => {
    props.selectRestaurant(restaurant)
    props.navigation.navigate("Items");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.restaurants}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <RestaurantItem
            name={item.name}
            image={item.image}
            cuisine={item.cuisine}
            location={item.location}
            isVegetarian={item.isVegetarian}
            handleNaviagation={() => handleNavigation(item)}
          />
        )}
      />
    </View>
  );

}
const ConnectedRestaurants = connect(mapStateToProps, mapDtoP)(Restaurants);

export default ConnectedRestaurants;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
