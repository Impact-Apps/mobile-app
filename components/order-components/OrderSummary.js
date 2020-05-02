import React, { useEffect} from "react";
import axios from 'axios'
import {
    StyleSheet,
    View,
    FlatList,
} from "react-native";
import ListItem from "./ListItem";


const OrderSummary = (props) => {
  
  const state = {
    items: props.route.params.items
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={item => item.itemId}
        renderItem={({ item }) => {
            return (
                <ListItem
                    name={item.name}
                    image={item.image}
                    cuisine={item.cuisine}
                    price={item.price}
                    label={item.label}
                    isVegetarian={item.isVegetarian}
                />
            )
        }}
      />
    </View>
  );
}


export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
