import React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    Button
} from "react-native";

import {SimpleStepper} from "react-native-simple-stepper";

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }
    qtyChanged(value){
        this.props.updateItemQuantity(value)
    }

    render() {
        return (
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.props.image }}
                    />
                    <View style={{padding: 16}}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#333"
                            }}>
                            {this.props.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "#999"
                            }}>
                            {`Quantity: ${this.props.quantity}`}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                            <Text
                                style={{
                                    fontSize: 21,
                                    fontWeight: "bold",
                                    color: "#ef6136"
                                }}>
                                {`€ ${this.props.subTotal}`}
                            </Text>
                        </View>

                    </View>
                    <View style={styles.itemContainer}>
                        <SimpleStepper
                            valueChanged={value => this.qtyChanged(value)}
                            initialValue={this.props.quantity}
                            minimumValue={1}
                            maximumValue={10}
                            showText={true}
                            containerStyle={StyleSheet.flatten(styles.stepperContainer)}
                            incrementImageStyle={StyleSheet.flatten(styles.stepperButton)}
                            decrementImageStyle={StyleSheet.flatten(styles.stepperButton)}
                            textStyle={StyleSheet.flatten(styles.stepperText)}
                        />
                        <Button
                            onPress={this.props.removeItemFromCart}
                            title="Remove item"
                            color="#c53c3c"
                        />
                    </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    card:{
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
    },
    image:{
        width: 108,
        height: 108,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 4
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
        marginTop: 35,
        flex: 1,
        alignItems: 'center',

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
        height: 10,
        width: 10,
    },
    stepperText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
})
