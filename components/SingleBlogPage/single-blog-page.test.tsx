import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockSingleBlogHook = jest.fn();
const mockCreateCommentMutateAsync = jest.fn();
const mockToggleLoveMutateAsync = jest.fn();
const mockToggleBookmarkMutateAsync = jest.fn();
const mockCreateCommentHook = jest.fn();
const mockToggleLoveHook = jest.fn();
const mockToggleBookmarkHook = jest.fn();
const mockPush = jest.fn();
const mockToasterAlert = jest.fn();
const mockGetCookie = jest.fn();

jest.mock("@/hooks/blog/useGetBlogs", () => ({
  useGetASingleBlog: (...args: unknown[]) => mockSingleBlogHook(...args),
}));

jest.mock("@/hooks/blog/useCreateBlogComment", () => ({
  useCreateBlogComment: () => mockCreateCommentHook(),
}));

jest.mock("@/hooks/blog/useToggleLoveABlog", () => ({
  useToggleLoveABlog: () => mockToggleLoveHook(),
}));

jest.mock("@/hooks/blog/useToggleBookmarkABlog", () => ({
  useToggleBookmarkABlog: () => mockToggleBookmarkHook(),
}));

jest.mock("@/hooks/getDecodeToken/getDecodedToken", () => ({
  getDecodedToken: () => ({
    id: "author-1",
    firstName: "Ada",
    lastName: "Lovelace",
    authorImg: "/me.jpg",
  }),
}));

jest.mock("cookies-next/client", () => ({
  getCookie: (...args: unknown[]) => mockGetCookie(...args),
}));

jest.mock("@/utils", () => ({
  formatDate: (value: string) => `formatted-${value}`,
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

jest.mock("@/components/modals/DeleteConfirmation", () => {
  const MockDeleteConfirmation = () => (
    <div data-testid="delete-confirmation">Delete confirmation</div>
  );
  MockDeleteConfirmation.displayName = "MockDeleteConfirmation";
  return MockDeleteConfirmation;
});

jest.mock("@/components/modals/EditModal", () => {
  const MockEditModal = () => <div data-testid="edit-modal">Edit modal</div>;
  MockEditModal.displayName = "MockEditModal";
  return MockEditModal;
});

jest.mock("@/components/modals/EditComment", () => {
  const MockEditComment = () => (
    <div data-testid="edit-comment-modal">Edit comment</div>
  );
  MockEditComment.displayName = "MockEditComment";
  return MockEditComment;
});

jest.mock("@/components/modals/DeleteComment", () => {
  const MockDeleteComment = () => (
    <div data-testid="delete-comment-modal">Delete comment</div>
  );
  MockDeleteComment.displayName = "MockDeleteComment";
  return MockDeleteComment;
});

jest.mock("@/components/LoadingSkeletons/SingleBlogPageSkeleton", () => {
  const MockSingleBlogPageSkeleton = () => (
    <div data-testid="single-blog-skeleton">Loading single blog</div>
  );
  MockSingleBlogPageSkeleton.displayName = "MockSingleBlogPageSkeleton";
  return MockSingleBlogPageSkeleton;
});

import SingleBlogPage from "@/components/SingleBlogPage/SingleBlogPage";
import { renderWithAppContext } from "@/test-utils/renderWithAppContext";
import { useRouter } from "next/navigation";

const singleBlogResponse = {
  blog: [
    {
      _id: "blog-1",
      title: "A full single blog title",
      blogContent: "<p>Rendered content</p>",
      category: "Programming",
      createdAt: "2025-01-01",
      readTime: 3,
      loveCount: 2,
      commentCount: 1,
      loves: ["author-1"],
      bookmarks: ["author-1"],
      articleImg: "/cover.jpg",
      author: {
        _id: "author-1",
        firstName: "Ada",
        lastName: "Lovelace",
        authorImg: "/ada.jpg",
      },
      comments: [
        {
          _id: "comment-1",
          comment: "Great post",
          commentedAt: "2025-01-02",
          commenter: {
            _id: "author-1",
            firstName: "Ada",
            lastName: "Lovelace",
            authorImg: "/ada.jpg",
          },
        },
      ],
    },
  ],
};

describe("SingleBlogPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue("token-123");
    mockSingleBlogHook.mockReturnValue({
      data: singleBlogResponse,
      isLoading: false,
    });
    mockCreateCommentHook.mockReturnValue({
      mutateAsync: mockCreateCommentMutateAsync,
    });
    mockToggleLoveHook.mockReturnValue({
      data: undefined,
      mutateAsync: mockToggleLoveMutateAsync,
      isSuccess: false,
      isPending: false,
    });
    mockToggleBookmarkHook.mockReturnValue({
      data: undefined,
      mutateAsync: mockToggleBookmarkMutateAsync,
      isSuccess: false,
      isPending: false,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("renders a single blog with author controls for the owner", () => {
    renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {
      state: {
        openEditModal: false,
        deleteModal: false,
        editCommentClicked: false,
        deleteCommentClicked: false,
        updatedCommentArray: null,
      },
    });

    expect(screen.getByText(/a full single blog title/i)).toBeInTheDocument();
    expect(screen.getByText(/author: ada lovelace/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /edit blog/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/great post/i)).toBeInTheDocument();
  });

  it("submits a new comment and stores the updated comment array", async () => {
    const user = userEvent.setup();
    mockCreateCommentMutateAsync.mockResolvedValue({
      message: "Comment added",
      updatedBlog: {
        comments: [
          ...singleBlogResponse.blog[0].comments,
          {
            _id: "comment-2",
            comment: "New comment",
            commentedAt: "2025-01-03",
            commenter: {
              _id: "author-1",
              firstName: "Ada",
              lastName: "Lovelace",
              authorImg: "/ada.jpg",
            },
          },
        ],
      },
    });

    const { dispatch } = renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {
      state: {
        updatedCommentArray: null,
      },
    });

    await user.type(screen.getByLabelText(/comment/i), "New comment");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockCreateCommentMutateAsync).toHaveBeenCalledWith({
        comment: { comment: "New comment" },
        blogId: "blog-1",
      });
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATED_COMMENT_ARRAY",
      payload: expect.any(Array),
    });
    expect(mockToasterAlert).toHaveBeenCalledWith("Comment added");
  });

  it("opens edit and delete blog actions via AppContext dispatch", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {});

    await user.click(screen.getAllByRole("button", { name: /edit blog/i })[0]);
    expect(dispatch).toHaveBeenCalledWith({
      type: "OPEN_EDIT_MODAL",
      payload: {
        storedBlogId: "blog-1",
        openEditModal: true,
        singleBlogDetail: singleBlogResponse.blog[0],
      },
    });

    await user.click(screen.getAllByRole("button", { name: /delete blog/i })[0]);
    expect(dispatch).toHaveBeenCalledWith({
      type: "CONFIRM_DELETE",
      payload: {
        storedBlogId: "blog-1",
        deleteModal: true,
        singleBlogDetail: singleBlogResponse.blog[0],
      },
    });
  });

  it("redirects unauthenticated users who try to like or bookmark", async () => {
    const user = userEvent.setup();
    mockGetCookie.mockReturnValue(undefined);

    renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {});

    await user.click(screen.getByRole("button", { name: /2/i }));
    expect(mockToasterAlert).toHaveBeenCalledWith(
      "You are offline, please login to be able to like this blog."
    );
    expect(mockPush).toHaveBeenCalledWith("/login");

    await user.click(document.querySelector(".lucide-bookmark") as Element);
    expect(mockToasterAlert).toHaveBeenCalledWith(
      "You are offline, please login to be able to bookmark this blog."
    );
  });

  it("opens edit and delete comment actions for the comment author", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {});

    await user.click(screen.getByRole("button", { name: /edit comment/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: "EDIT_COMMENT",
      payload: {
        editCommentClicked: true,
        storedBlogId: "blog-1",
        commentToEdit: "Great post",
        commentId: "comment-1",
      },
    });

    await user.click(screen.getByRole("button", { name: /delete comment/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_COMMENT",
      payload: {
        deleteCommentClicked: true,
        storedBlogId: "blog-1",
        commentId: "comment-1",
      },
    });
  });

  it("renders modals and loading states when flags are enabled", () => {
    mockSingleBlogHook.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {
      state: {
        openEditModal: false,
        deleteModal: false,
        editCommentClicked: false,
        deleteCommentClicked: false,
      },
    });

    expect(screen.getByTestId("single-blog-skeleton")).toBeInTheDocument();
  });

  it("renders modal components when state flags are already set", () => {
    renderWithAppContext(<SingleBlogPage blogId="blog-1" />, {
      state: {
        openEditModal: true,
        deleteModal: true,
        editCommentClicked: true,
        deleteCommentClicked: true,
      },
    });

    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
    expect(screen.getByTestId("delete-confirmation")).toBeInTheDocument();
    expect(screen.getByTestId("edit-comment-modal")).toBeInTheDocument();
    expect(screen.getByTestId("delete-comment-modal")).toBeInTheDocument();
  });
});
