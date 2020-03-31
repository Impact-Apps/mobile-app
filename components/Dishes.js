import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from "react-native";
import foodData from "../food-data.json";
import ListItem from "./ListItem";
import CartButton from "./common/CartButton";
import {connect} from "react-redux";

const mapStateToProps = (state) =>{
  return {
    restaurant: state.restaurantDetails.name
  }
}

const Dishes = (props) => {

  const handleNavigation = (item) => {
    props.navigation.navigate("ItemDetails", {item});
  };
  return (
    <View style={styles.container}>
      <Text>{props.restaurant}</Text>
      <FlatList
        data={foodData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            image={item.image}
            cuisine={item.cuisine}
            price={item.price}
            label={item.label}
            isVegetarian={item.isVegetarian}
            handleNaviagation={() => handleNavigation(item)}
          />
        )}
      />
    </View>
  );
}

Dishes.navigationOptions = (props) => {
    return {
        headerTitle: "Menu",
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0
        },
        headerRight: (
            <CartButton
                onPress={() => { props.navigation.navigate('Cart');}}
            />
        )
    };
};
const ConnectedDishes = connect(mapStateToProps, null)(Dishes);

export default ConnectedDishes;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
