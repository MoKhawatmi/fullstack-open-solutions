let initialNoti = "";

export function notiAction(content) {
    return {
        type: "ADD_NOTI",
        data: {
            content
        }
    }
}

export function removeNotiAction() {
    return {
        type: "REMOVE_NOTI"
    }
}

function notiReducer(state = initialNoti, action) {
    let newState=state;
    switch (action.type) {
        case "ADD_NOTI":
            newState=action.data.content;
            return newState;
        case "REMOVE_NOTI":
            newState="";
            return newState;
        default:
            return newState;
    }
}

export default notiReducer;