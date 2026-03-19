import { AppContext } from "@/context/AppContext";
import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

type AppContextValue = {
  state: Record<string, unknown>;
  dispatch: jest.Mock;
};

const defaultContextValue: AppContextValue = {
  state: {
    deleteModal: false,
    openEditModal: false,
    storedBlogId: null,
    singleBlogDetail: null,
    contentTextColorWarning: true,
  },
  dispatch: jest.fn(),
};

export const renderWithAppContext = (
  ui: ReactElement,
  value: Partial<AppContextValue> = {}
) => {
  const contextValue: AppContextValue = {
    ...defaultContextValue,
    ...value,
    state: {
      ...defaultContextValue.state,
      ...value.state,
    },
    dispatch: value.dispatch ?? jest.fn(),
  };

  return {
    ...render(
      <AppContext.Provider value={contextValue}>{ui}</AppContext.Provider>
    ),
    dispatch: contextValue.dispatch,
  };
};
