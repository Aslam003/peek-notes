
export const getNotes = () =>{
    return{
        type:'GET_NOTES'
    };  
};

export const deleteNotes = (id) =>{
    return{
        type:'DELETE_NOTES',
        payload:id
    };
};
export const addNotes = (note) =>{
    return{
        type:'ADD_NOTES',
        payload:note
    };
}
export const setItemsLoading = (id) =>{
    return{
        type: "ITEMS_LOADING",
        payload:id
    };
};

