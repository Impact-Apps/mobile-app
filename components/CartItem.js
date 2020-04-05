import React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity, StyleSheet, Button
} from "react-native";
import {SimpleStepper} from "react-native-simple-stepper";

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                                {`Subtotal: ${this.props.subTotal}`}
                            </Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <SimpleStepper
                                valueChanged={value => this.props.qtyChanged(value)}
                                initialValue={this.props.quantity}
                                minimumValue={1}
                                maximumValue={10}
                                showText={true}
                                containerStyle={StyleSheet.flatten(styles.stepperContainer)}
                                incrementImageStyle={StyleSheet.flatten(styles.stepperButton)}
                                decrementImageStyle={StyleSheet.flatten(styles.stepperButton)}
                                textStyle={StyleSheet.flatten(styles.stepperText)}
                            />
                        </View>
                        <View style={styles.itemContainer}>
                            <Button
                                onPress={() => {
                                    this.props.removeFromCart()
                                }}
                                title="Remove Item From Cart"
                                color="#c53c3c"
                            />
                        </View>
                    </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
    },
    stepperContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: '#ccc',
    },
    itemContainer: {
        marginBottom: 20,
    },
    smallItemContainer: {
        marginBottom: 5,
    },
    mainText: {
        fontSize: 20,
    },
    subText: {
        fontSize: 14,
        color: '#3a3a3a',
    },
    priceText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 18,
        color: '#303540',
    },
    stepperButton: {
        height: 20,
        width: 20,
    },
    stepperText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
