import React, { useEffect} from "react";
import axios from 'axios'
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from "react-native";
// import foodData from "../food-data.json";
import ListItem from "./ListItem";
import CartButton from "./common/CartButton";
import {connect} from "react-redux";
import { fetchItems } from '../redux';

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchItems: items => dispatch(fetchItems(items))
  }
}

const mapStateToProps = (state) =>{
  return {
    selectedRestaurant: state.restaurantDetails.selectedRestaurant, // restaurant menuID
    items: state.items.items
  }
}

const Items = (props) => {

  useEffect( () =>  {
    const fetchItems =  async () => {
      const response =  await axios.get(`http://localhost:3003/api/menu/${props.selectedRestaurant._id}/items`) // api/menu/id
      console.log(response.data)
      props.fetchItems(response.data)
    }
    fetchItems()
  },[])

  const handleNavigation = (item) => {
    props.navigation.navigate("ItemDetails", {item});
  };
  return (
    <View style={styles.container}>
      <Text>{props.selectedRestaurant.name}</Text>
      <FlatList
        data={props.items}
        keyExtractor={item => item._id}
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

Items.navigationOptions = (props) => {
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
const ConnectedItems = connect(mapStateToProps, mapDispatchToProps)(Items);

export default ConnectedItems;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
