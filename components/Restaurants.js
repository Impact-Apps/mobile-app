import React, { useEffect} from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import restaurantsData from "../api/restaurants.json";
import RestaurantItem from "./RestaurantItem";
import {connect} from "react-redux";
import { selectRestaurant, fetchRestaurants} from '../redux';
import axios from 'axios'
const mapDtoP = (dispatch) =>{
  return {
    selectRestaurant: restaurant => dispatch(selectRestaurant(restaurant)),
    fetchRestaurants: restaurants => dispatch(fetchRestaurants(restaurants))
  }
}

const mapStateToProps = (state) =>{
  return {
    restaurants: state.restaurantDetails.restaurants
  }
}

const Restaurants = (props) => {

  useEffect(  () =>  {
    const fetchRestaurant =  async () => {
      const response =  await axios.get('http://localhost:3003/api/restaurant')
      console.log(response.data)
      props.fetchRestaurants(response.data)
    }
    fetchRestaurant()
  },[])



  const handleNavigation = (restaurant) => {
    props.selectRestaurant(restaurant)
    props.navigation.navigate("Dishes");
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
