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

    case "PROFILE_DATA_STORAGE":
      return {
        ...state,
        profileData: action.payload,
      };

    case "CONTENT_TEXT_COLOR_WARNING":
      return {
        ...state,
        contentTextColorWarning: action.payload,
      };

    case "DISPLAY_BLOG_ARRAY":
      return {
        ...state,
        displayBlogArray: action.payload,
      };

    case "EDIT_COMMENT":
      return {
        ...state,
        storedBlogId: action.payload.storedBlogId,
        commentToEdit: action.payload.commentToEdit,
        commentId: action.payload.commentId,
        editCommentClicked: action.payload.editCommentClicked,
        updatedCommentArray: action.payload.updatedCommentArray,
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        storedBlogId: action.payload.storedBlogId,
        commentId: action.payload.commentId,
        deleteCommentClicked: action.payload.deleteCommentClicked,
        updatedCommentArray: action.payload.updatedCommentArray,
      };

    case "UPDATED_COMMENT_ARRAY":
      return {
        ...state,
        updatedCommentArray: action.payload,
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
  canLogin: false,
  profileData: null,
  contentTextColorWarning: true,
  displayBlogArray: null,
  commentToEdit: null,
  commentId: null,
  editCommentClicked: false,
  updatedCommentArray: null,
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
