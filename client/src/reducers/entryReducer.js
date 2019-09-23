const removeEntry = (id, state) => {
    const entries = state.entries.filter(item => item._id !== id)

    return {
        ...state,
        entries
    }
}

export const entryReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'LIST_ENTRIES' :
            return { 
                ...state,
                entries: action.entries
            }
        case 'REMOVE_ENTRY':
            return removeEntry(action.id, state)
        default:
            break;
    }
}