
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
            if(state.items.length<1) return {...state, numOfItems: action.item.quantity, items: [action.item]}
            const items = state.items.reduce((cart,item)=>{
                if (item.id === action.item.id) {
                    cart.push({...item, quantity:item.quantity + action.item.quantity})
                }else{
                    cart.push(item)
                }
                return cart
            },[])
            return {...state, numOfItems: state.numOfItems+action.item.quantity, items};
        case 'EMPTY_CART':
            return {...state, numOfItems:0, items:[]};
        default:
            return state;
    }
};

export const reducers = combineReducers({
    items
});

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();
