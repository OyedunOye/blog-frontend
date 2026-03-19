import BlogContentTextColorWarning from "@/components/modals/BlogContentTextColorWarning";
import DeactivateUserConfirmation from "@/components/modals/DeactivateUserConfirmation";
import DeleteConfirmation from "@/components/modals/DeleteConfirmation";
import QuillEditBlogModal from "@/components/modals/EditModal";
import { renderWithAppContext } from "@/test-utils/renderWithAppContext";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

const mockDeleteBlogMutateAsync = jest.fn();
const mockDeactivateUserMutateAsync = jest.fn();
const mockToasterAlert = jest.fn();
const mockPush = jest.fn();
const mockCookieRemove = jest.fn();

jest.mock("@/components/QuillEditBlogForm/QuillEditBlogForm", () => {
  const MockQuillEditBlogForm = () => (
    <div data-testid="quill-edit-blog-form">Quill edit form</div>
  );
  MockQuillEditBlogForm.displayName = "MockQuillEditBlogForm";
  return MockQuillEditBlogForm;
});

jest.mock("@/hooks/blog/useDeleteBlog", () => ({
  useDeleteABlog: () => ({
    mutateAsync: mockDeleteBlogMutateAsync,
  }),
}));

jest.mock("@/hooks/authors/useDeleteUserAccount", () => ({
  useDeactivateUserAccount: () => ({
    mutateAsync: mockDeactivateUserMutateAsync,
    isPending: false,
  }),
}));

jest.mock("@/utils", () => ({
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

jest.mock("universal-cookie", () =>
  jest.fn().mockImplementation(() => ({
    remove: mockCookieRemove,
  }))
);

describe("modal components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("closes the text-color warning modal through context dispatch", async () => {
    const user = userEvent.setup();
    const { container, dispatch } = renderWithAppContext(
      <BlogContentTextColorWarning />
    );

    const closeIcon = container.querySelector("svg");
    expect(closeIcon).not.toBeNull();
    await user.click(closeIcon as Element);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CONTENT_TEXT_COLOR_WARNING",
      payload: false,
    });
  });

  it("renders the edit modal and dispatches close from the back button", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<QuillEditBlogModal />);

    expect(screen.getByTestId("quill-edit-blog-form")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(dispatch).toHaveBeenCalledWith({
      type: "CLOSE_EDIT_MODAL",
      payload: {
        openEditModal: false,
        storedBlogId: null,
        singleBlogDetail: null,
      },
    });
  });

  it("cancels blog deletion by dispatching the close action", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<DeleteConfirmation />, {
      state: {
        storedBlogId: "blog-123",
        singleBlogDetail: { title: "My draft post" },
      },
    });

    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(dispatch).toHaveBeenCalledWith({
      type: "CONFIRM_DONT_DELETE",
      payload: {
        deleteModal: false,
        storedBlogId: null,
        singleBlogDetail: null,
      },
    });
  });

  it("deletes a blog and redirects home", async () => {
    const user = userEvent.setup();
    mockDeleteBlogMutateAsync.mockResolvedValue({ message: "deleted" });

    const { dispatch } = renderWithAppContext(<DeleteConfirmation />, {
      state: {
        storedBlogId: "blog-123",
        singleBlogDetail: { title: "My draft post" },
      },
    });

    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    await waitFor(() => {
      expect(mockDeleteBlogMutateAsync).toHaveBeenCalledWith("blog-123");
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "CONFIRM_DONT_DELETE",
      payload: {
        deleteModal: false,
        storedBlogId: null,
        singleBlogDetail: null,
      },
    });
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("cancels account deactivation by dispatching the close action", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<DeactivateUserConfirmation />);

    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(dispatch).toHaveBeenCalledWith({
      type: "CONFIRM_DONT_DELETE",
      payload: {
        deleteModal: false,
      },
    });
  });

  it("deactivates the user account, clears auth cookie, and redirects home", async () => {
    const user = userEvent.setup();
    mockDeactivateUserMutateAsync.mockResolvedValue({
      message: "Account deactivated",
    });

    const { dispatch } = renderWithAppContext(<DeactivateUserConfirmation />);

    await user.click(
      screen.getByRole("button", { name: /deactivate account/i })
    );

    await waitFor(() => {
      expect(mockDeactivateUserMutateAsync).toHaveBeenCalled();
    });
    expect(mockToasterAlert).toHaveBeenCalledWith("Account deactivated");
    expect(mockCookieRemove).toHaveBeenCalledWith("token");
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(dispatch).toHaveBeenCalledWith({
      type: "CONFIRM_DONT_DELETE",
      payload: {
        deleteModal: false,
      },
    });
  });
});
