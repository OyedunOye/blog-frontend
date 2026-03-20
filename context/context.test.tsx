import { AppContext, AppProvider, AppReducer } from "@/context/AppContext";
import { QueryProvider } from "@/context/QueryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React, { useContext } from "react";

describe("AppReducer", () => {
  const baseState = {
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
    searching: false,
  };

  it("handles delete and edit modal actions", () => {
    expect(
      AppReducer(baseState, {
        type: "CONFIRM_DELETE",
        payload: { deleteModal: true, storedBlogId: "1", singleBlogDetail: {} },
      })
    ).toEqual(expect.objectContaining({ deleteModal: true, storedBlogId: "1" }));

    expect(
      AppReducer(baseState, {
        type: "OPEN_EDIT_MODAL",
        payload: { openEditModal: true, storedBlogId: "1", singleBlogDetail: {} },
      })
    ).toEqual(expect.objectContaining({ openEditModal: true, blogId: "1" }));
  });

  it("handles search and comment state actions", () => {
    expect(
      AppReducer(baseState, {
        type: "DISPLAY_BLOG_ARRAY",
        payload: { displayBlogArray: [1, 2], searching: true },
      })
    ).toEqual(expect.objectContaining({ displayBlogArray: [1, 2], searching: true }));

    expect(
      AppReducer(baseState, {
        type: "UPDATED_COMMENT_ARRAY",
        payload: ["comment"],
      })
    ).toEqual(expect.objectContaining({ updatedCommentArray: ["comment"] }));
  });

  it("handles the remaining state updates", () => {
    expect(
      AppReducer(baseState, {
        type: "CONFIRM_DONT_DELETE",
        payload: { deleteModal: false, storedBlogId: null, singleBlogDetail: null },
      })
    ).toEqual(expect.objectContaining({ deleteModal: false }));

    expect(
      AppReducer(baseState, {
        type: "CLOSE_EDIT_MODAL",
        payload: { openEditModal: false, storedBlogId: null, singleBlogDetail: null },
      })
    ).toEqual(expect.objectContaining({ openEditModal: false }));

    expect(
      AppReducer(baseState, {
        type: "BLOGCONTENT_WARN",
        payload: "Yes",
      })
    ).toEqual(expect.objectContaining({ blogContentWarn: "Yes" }));

    expect(
      AppReducer(baseState, {
        type: "CAN_LOGIN",
        payload: true,
      })
    ).toEqual(expect.objectContaining({ canLogin: true }));

    expect(
      AppReducer(baseState, {
        type: "PROFILE_DATA_STORAGE",
        payload: { firstName: "Ada" },
      })
    ).toEqual(expect.objectContaining({ profileData: { firstName: "Ada" } }));

    expect(
      AppReducer(baseState, {
        type: "CONTENT_TEXT_COLOR_WARNING",
        payload: false,
      })
    ).toEqual(expect.objectContaining({ contentTextColorWarning: false }));

    expect(
      AppReducer(baseState, {
        type: "EDIT_COMMENT",
        payload: {
          storedBlogId: "blog-1",
          commentToEdit: "hello",
          commentId: "comment-1",
          editCommentClicked: true,
          updatedCommentArray: ["hello"],
        },
      })
    ).toEqual(
      expect.objectContaining({
        storedBlogId: "blog-1",
        commentToEdit: "hello",
        commentId: "comment-1",
        editCommentClicked: true,
      })
    );

    expect(
      AppReducer(baseState, {
        type: "DELETE_COMMENT",
        payload: {
          storedBlogId: "blog-1",
          commentId: "comment-1",
          deleteCommentClicked: true,
          updatedCommentArray: ["hello"],
        },
      })
    ).toEqual(
      expect.objectContaining({
        storedBlogId: "blog-1",
        commentId: "comment-1",
        deleteCommentClicked: true,
      })
    );
  });

  it("returns the original state for unknown actions", () => {
    expect(AppReducer(baseState, { type: "UNKNOWN" })).toBe(baseState);
  });
});

describe("providers", () => {
  it("provides app state and dispatch through AppProvider", () => {
    const Consumer = () => {
      const value = useContext(AppContext);
      return <div>{String(value.state.contentTextColorWarning)}</div>;
    };

    render(
      <AppProvider>
        <Consumer />
      </AppProvider>
    );

    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("provides a React Query client through QueryProvider", () => {
    const Consumer = () => {
      const queryClient = useQueryClient();
      return <div>{queryClient ? "query-client" : "missing"}</div>;
    };

    render(
      <QueryProvider>
        <Consumer />
      </QueryProvider>
    );

    expect(screen.getByText("query-client")).toBeInTheDocument();
  });
});
