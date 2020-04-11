
import {
    combineReducers,
    createStore,
} from 'redux';
import { orders} from "./orders-store";

// cart
// actions.js
export const addToCart = item => ({
    type: 'ADD_TO_CART',
    item,
});

export const removeItemFromCart = item => ({
    type: 'REMOVE_ITEM_FROM_CART',
    item,
});

export const emptyCart = () => ({
    type: 'EMPTY_CART'
});

// reducers.js
export const cart = (state = {items:[]}, action) => {
    let itemIndex;
    switch (action.type) {
        case 'ADD_TO_CART':
            itemIndex = state.items.findIndex((item)=> item._id ===action.item._id)
            if(itemIndex !== -1) {
                state.items[itemIndex].quantity = action.item.quantity
                return {...state}
            }
            return {...state, items: [...state.items,action.item] }
        case 'EMPTY_CART':
            return {...state, items:[]};
        case 'REMOVE_ITEM_FROM_CART':
            return {...state, items: state.items.filter(item => item._id !== action.item._id)}
        default:
            return state;
    }
};

// restaurants
export const selectRestaurant = restaurant => ({
    type: 'SELECT_RESTAURANT',
    restaurant,
});

export const fetchRestaurants = restaurants => ({
    type: 'FETCH_RESTAURANTS',
    restaurants
})

export const restaurantDetails = (state={restaurants:[], selectedRestaurant: null}, action ) => {
    // todo - name to restaurantName
    switch (action.type) {
        case 'SELECT_RESTAURANT':
            return {...state, selectedRestaurant: action.restaurant}
        case 'FETCH_RESTAURANTS':
            return {...state, restaurants : action.restaurants}
        default:
            return state
    }
}

// items
// actions.js
export const fetchItems = items => ({
    type: 'FETCH_ITEMS',
    items
})

// reducers.js
export const items = (state = {items:[]}, action) => {
    switch (action.type) {
        case 'FETCH_ITEMS':
            return {...state, items: action.items}
        default:
            return state
    }
};

// order
export const createOrder = order => ({
    type: 'CREATE_ORDER',
    order,
});

export const resetOrder = () => ({
    type: 'RESET_ORDER',
});

export const order = (state={}, action ) => {
    switch (action.type) {
        case 'CREATE_ORDER':
            return  action.order
        case 'RESET_ORDER':
            return  {}
        default:
            return state
    }
}

export const reducers = combineReducers({
    cart,
    restaurantDetails,
    items,
    order,
    orders
});

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();
