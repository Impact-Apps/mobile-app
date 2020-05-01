
export const getActiveOrders = orders => ({
    type: 'FETCH_ACTIVE_ORDERS',
    orders,
});

export const getHistoricalOrders = orders => ({
    type: 'FETCH_HISTORICAL_ORDERS',
    orders,
});

export const orders = (state={ active: [], historical: [] }, action ) => {
    switch (action.type) {
        case 'FETCH_ACTIVE_ORDERS':
            return  {...state, active: action.orders}
        case 'FETCH_HISTORICAL_ORDERS':
            return  {...state, historical: action.orders}
        default:
            return state
    }
}


