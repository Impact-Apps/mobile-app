import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import restaurantsData from "../api/restaurants.json";
import RestaurantItem from "./RestaurantItem";
import CartButton from "./common/CartButton";
import {connect} from "react-redux";
import { selectRestaurant} from '../redux';

const mapDtoP = (dispatch) =>{
  return {
    selectRestaurant: restaurant => dispatch(selectRestaurant(restaurant))
  }
}

const Restaurants = (props) => {
  const handleNavigation = (restaurant) => {
    props.selectRestaurant(restaurant)
    props.navigation.navigate("Dishes");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurantsData}
        keyExtractor={item => item.id}
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
const ConnectedRestaurants = connect(null, mapDtoP)(Restaurants);

export default ConnectedRestaurants;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
