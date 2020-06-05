
const initialState = {
    userId:{},
    notes:[{
        title:"Welcome!",
        content: "Please login to save your notes!"
    }]
};

const noteReducers = (state = initialState, action) => {
    switch(action.type){
        case 'GET_NOTES':
            return {
                ...state
            }
        case "DELETE_NOTES":
            return {
                ...state,
                notes: state.notes.filter((note,id) => id !== action.payload)
            }
        case 'ADD_NOTES':
            return {
                ...state,
                notes:[action.payload, ...state.notes]
            }
        case "ITEMS_LOADING":
            return{
                ...state,
                userId:action.payload
            }
        default:
            return state;
    }
}

export default noteReducers;