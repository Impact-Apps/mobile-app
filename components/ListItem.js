import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.handleNaviagation}>
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
          <Image
            style={{
              width: 108,
              height: 108,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}
            source={{ uri: this.props.image }}
          />
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
              {this.props.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666"
              }}
            >
              {this.props.cuisine},{" "}
              {this.props.isVegetarian ? (
                <Text style={{ color: "#4caf50", fontWeight: "bold" }}>
                  Veg
                </Text>
              ) : (
                <Text style={{ color: "#a92319", fontWeight: "bold" }}>
                  Non-Veg
                </Text>
              )}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#999"
              }}
            >
              {this.props.label}
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
                {`€ ${this.props.price}`}
              </Text>

            </View>
            { this.props.cartQuantity ? <View
                  style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: '#ef6136',
                      position: 'absolute',
                      right: 8,
                      top: 2
                  }}
              >
                  <Text
                      style={{
                          color: '#fff',
                          fontSize: 13,
                          textAlign: 'center',
                          lineHeight: 20
                      }}
                  >
                      {this.props.cartQuantity}
                  </Text>
              </View> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
