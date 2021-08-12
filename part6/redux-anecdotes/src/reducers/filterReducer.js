let initialState = '';

export function filterChangeAction(content) {
    return {
        type: "FILTER_CHANGE",
        data: {
            content
        }
    }
}

let filterReducer = (state = initialState, action) => {
    console.log("filter reducer");
    let newState;
    switch (action.type) {
        case "FILTER_CHANGE":
            newState = action.data.content;
            return newState;
        default:
            return state;
    }
}

export default filterReducer;