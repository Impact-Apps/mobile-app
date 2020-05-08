
export const setUser = user => ({
    type: 'SET_USER',
    user
});
export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

export const user = (state={}, action ) => {
    switch (action.type) {
        case 'SET_USER':
            console.log(action.user)
            return  action.user
        case 'LOGOUT_USER':
            return  {}
        default:
            return state
    }
}


