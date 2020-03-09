
import {
    combineReducers,
    createStore,
} from 'redux';

// actions.js
export const addToCart = item => ({
    type: 'ADD_TO_CART',
    item,
});

export const emptyCart = () => ({
    type: 'EMPTY_CART'
});

// reducers.js
export const items = (state = {items:[], numOfItems: 0}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // todo only store quantity of 1st item in the item itself - - this is why we use the reduce
            if(state.items.filter(item => item.id === action.item.id).length !== 0) return {...state, numOfItems: state.numOfItems+action.item.quantity }
            return {...state, numOfItems: state.numOfItems+action.item.quantity, items: [...state.items,action.item] }
        case 'EMPTY_CART':
            return {...state, numOfItems:0, items:[]};
        default:
            return state;
    }
};

export const selectRestaurant = restaurant => ({
    type: 'SELECT_RESTAURANT',
    restaurant,
});

export const restaurantDetails = (state={name: null}, action ) => {
    switch (action.type) {
        case 'SELECT_RESTAURANT':
            return {...state, name: action.restaurant.name}
        default:
            return state
    }
}
export const reducers = combineReducers({
    items,
    restaurantDetails
});

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();
