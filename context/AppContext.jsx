'use client'

import {createContext, useReducer} from 'react'

export const AppReducer = (state, action) => {

    switch (action.type) {

    // case 'ADD_EXPENSE':
    //     // action.type = "DONE" //This line of code makes the add_expenses reducer non-functional!
    //     return {
    //         ...state,  //return the whole state i.e. currency, budget and expenses list.
    //         expenses: state.expenses.map(expense =>expense.name === action.payload.name
    //     ? {... expense, cost: expense.cost + action.payload.cost} : expense
    //     )}


    case 'CONFIRM_DELETE':

        return{
            ...state,
            deleteModal:action.payload.deleteModal,
            storedBlogId: action.payload.storedBlogId
        }


    case 'CONFIRM_DONT_DELETE':

        return{
            ...state,
            deleteModal:action.payload.deleteModal,
            storedBlogId: action.payload.storedBlogId
        }

    case 'OPEN_EDIT_MODAL':

        return{
            ...state,
            openEditModal:action.payload.openEditModal,
            blogId:action.payload.storedBlogId,
            singleBlogDetail: action.payload.singleBlogDetail
        }

    case 'CLOSE_EDIT_MODAL':

        return{
            ...state,
            openEditModal:action.payload.openEditModal,
            storedBlogId: action.payload.storedBlogId,
            singleBlogDetail: action.payload.singleBlogDetail
        }

    // case 'REMOVE_ALLOCATION':
    //     return {
    //         ...state,
    //         expenses: state.expenses.filter(expense=>expense.id !== action.payload)
    //     }


    // case 'DARK_MODE':
    //     return {
    //         ...state,
    //         displayMode: action.payload
    //     }

    default:
        return state;
  }
}

//Initial app state on login
const initialState = {
    deleteModal: false,
    openEditModal:false,
    storedBlogId: null,
    singleBlogDetail: null
    
};

//create the context. This is the thing that the components import and use to get the state
export const AppContext = createContext()

//need a provider component which wraps the components we want to give access to the state.
//It accepts the children, which are the nested(wrapped) components
export const AppProvider = ({ children }) => {
    //set up the app state. This takes a reducer and an initial state parameters.
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // console.log("AppProvider State:", state);
    return(
        <AppContext.Provider
            value={{
                state,
                dispatch,

            }}
        >
            {children}
        </AppContext.Provider>
    )
}