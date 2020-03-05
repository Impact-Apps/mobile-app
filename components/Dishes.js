import React from "react";
import {
  StyleSheet,
  View,
  FlatList
} from "react-native";
import foodData from "../food-data.json";
import ListItem from "./ListItem";
import CartButton from "./common/CartButton";

export default class Dishes extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Menu",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      headerRight: (
        <CartButton
        onPress = {() => {navigation.navigate('Cart');}}
        />
      )
    };
  };

  handleNaviagation = (item) => {
    this.props.navigation.navigate("ItemDetails", {item});
  };
  render() {
    return (
      <View style={styles.container}>
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
              handleNaviagation={() => this.handleNaviagation(item)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
