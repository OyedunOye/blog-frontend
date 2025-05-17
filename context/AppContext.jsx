"use client";

import { createContext, useReducer } from "react";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "CONFIRM_DELETE":
      return {
        ...state,
        deleteModal: action.payload.deleteModal,
        storedBlogId: action.payload.storedBlogId,
        singleBlogDetail: action.payload.singleBlogDetail,
      };

    case "CONFIRM_DONT_DELETE":
      return {
        ...state,
        deleteModal: action.payload.deleteModal,
        storedBlogId: action.payload.storedBlogId,
        singleBlogDetail: action.payload.singleBlogDetail,
      };

    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        openEditModal: action.payload.openEditModal,
        blogId: action.payload.storedBlogId,
        singleBlogDetail: action.payload.singleBlogDetail,
      };

    case "CLOSE_EDIT_MODAL":
      return {
        ...state,
        openEditModal: action.payload.openEditModal,
        storedBlogId: action.payload.storedBlogId,
        singleBlogDetail: action.payload.singleBlogDetail,
      };
    case "BLOGCONTENT_WARN":
      return {
        ...state,
        blogContentWarn: action.payload,
      };

    case "CAN_LOGIN":
      return {
        ...state,
        canLogin: action.payload,
      };

    case "DISPLAY_MODE":
      return {
        ...state,
        appMode: action.payload,
      };

    default:
      return state;
  }
};

//Initial app state on login
const initialState = {
  deleteModal: false,
  openEditModal: false,
  storedBlogId: null,
  singleBlogDetail: null,
  blogContentWarn: "No",
  appMode: "Light",
  canLogin: false,
};

//create the context. This is the thing that the components import and use to get the state
export const AppContext = createContext();

//need a provider component which wraps the components we want to give access to the state.
//It accepts the children, which are the nested(wrapped) components
export const AppProvider = ({ children }) => {
  //set up the app state. This takes a reducer and an initial state parameters.
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // console.log("AppProvider State:", state);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
