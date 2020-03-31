
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
            const itemIndex = state.items.findIndex((item)=> item.id ===action.item.id)
            if(itemIndex !== -1) {
                state.items[itemIndex].quantity +=action.item.quantity
                return {...state, numOfItems: state.numOfItems+action.item.quantity }
            }
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

export const fetchRestaurants = restaurants => ({
    type: 'FETCH_RESTAURANTS',
    restaurants
})

export const restaurantDetails = (state={restaurants:[], name: null}, action ) => {
    // todo - name to restaurantName
    switch (action.type) {
        case 'SELECT_RESTAURANT':
            return {...state, name: action.restaurant.name}
        case 'FETCH_RESTAURANTS':
            return {...state, restaurants : action.restaurants}
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
