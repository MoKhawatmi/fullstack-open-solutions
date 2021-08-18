let initialState = null;

export function loginAction(user) {
    return {
        type: "USER_LOGIN",
        data: {
            user
        }
    }
}

export function logoutAction() {
    return {
        type: "USER_LOGOUT"
    }
}

function userReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case 'USER_LOGIN':
            newState=action.data.user;
            return newState;
        case 'USER_LOGOUT':
            newState = null;
            return newState;
        default:
            return newState;
    }
}

export default userReducer;