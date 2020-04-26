import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.handleNavigation}>
        <View
          //elevation={2}
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <View
            style={{
              padding: 16
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#333"
              }}
            >
              Restaurant: {this.props.restaurantId}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666"
              }}
            >
              Ordered On: {this.props.orderedAt}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#999"
              }}
            >
              Number Of Items Ordered: {this.props.numberOfItems}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
                //width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}
              >
                Total: {`€ ${this.props.total}`}
              </Text>

            </View>
          </View>
        </View>
       </TouchableOpacity>
    );
  }
}
