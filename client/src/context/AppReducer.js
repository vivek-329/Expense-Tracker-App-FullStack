const appReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            
            return {...state, 
                transactions: state.transactions.filter(transaction => transaction._id !== 
                    action.payload)}
        case 'ADD_TRANSACTION':
            
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]

            };
         case 'TRANSACTIONS_ERROR':
            return {
                ...state,
                error:action.payload
            }      
        default:
            return state;
    }
}   

export default appReducer;