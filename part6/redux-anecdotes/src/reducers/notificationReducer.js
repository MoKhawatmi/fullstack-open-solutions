let initialState = "notification";

export function notiAction(content) {
    return ({
        type: "NOTI_VOTE",
        data: {
            content
        }
    })
}

export function removeNotiAction() {
    return ({
        type: "REMOVE_NOTI"
    })
}

const notiReducer = (state = initialState, action) => {
    console.log("noti reducer");
    let notiState;
    switch (action.type) {
        case "NOTI_VOTE":
            notiState = `you voted for ${action.data.content}`
            return notiState;
        case "REMOVE_NOTI":
            notiState = "";
            return notiState;
        default:
            return state;
    }
}

export default notiReducer;