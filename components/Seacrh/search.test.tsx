import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockBlogsHook = jest.fn();
const mockAuthorsHook = jest.fn();
const mockAUserHook = jest.fn();
const mockSubscribeMutateAsync = jest.fn();
const mockSubscribeHook = jest.fn();

jest.mock("@/hooks/blog/useGetBlogs", () => ({
  useGetAllBlogs: () => mockBlogsHook(),
}));

jest.mock("@/hooks/authors/useGetAllAuthors", () => ({
  useGetAllAuthors: () => mockAuthorsHook(),
}));

jest.mock("@/hooks/authors/useGetAUser", () => ({
  useGetAUser: () => mockAUserHook(),
}));

jest.mock("@/hooks/subscribe/useSubscribeToNewsletter", () => ({
  useSubscribeToNewsletter: () => mockSubscribeHook(),
}));

jest.mock("@/utils", () => ({
  formatDate: (value: string) => `formatted-${value}`,
  loggedInUserId: () => "user-1",
  toasterAlert: jest.fn(),
}));

jest.mock("universal-cookie", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock("@/components/Seacrh/ArticleSection", () => ({
  __esModule: true,
  default: Object.assign(
    ({
      allBlogs,
      errorStatus,
      loadingStatus,
    }: {
      allBlogs: unknown[];
      errorStatus: boolean;
      loadingStatus: boolean;
    }) => (
      <div data-testid="article-section-stub">
        ArticleSection {allBlogs.length} {String(errorStatus)}{" "}
        {String(loadingStatus)}
      </div>
    ),
    { displayName: "MockArticleSection" }
  ),
}));

jest.mock("@/components/Seacrh/BecomeAuthor", () => ({
  __esModule: true,
  default: Object.assign(
    () => <div data-testid="become-author-stub">BecomeAuthor</div>,
    { displayName: "MockBecomeAuthor" }
  ),
}));

import AllBlogs from "@/components/Seacrh/AllBlogs";
import Bookmarks from "@/components/Seacrh/Bookmarks";
import DiscoverPageCont from "@/components/Seacrh/DiscoverPageCont";
import ExploreAuthors from "@/components/Seacrh/ExploreAuthors";
import Favourites from "@/components/Seacrh/Favourites";
import SearchNewsletter from "@/components/Seacrh/NewsLetter";
import SearchHero from "@/components/Seacrh/SearchHero";
import { renderWithAppContext } from "@/test-utils/renderWithAppContext";

const buildBlog = (id: number) => ({
  _id: `blog-${id}`,
  title: `Search result title number ${id}`,
  blogContent: "content",
  readTime: "3",
  category: "Programming",
  loveCount: 1,
  loves: ["user-1"],
  bookmarks: ["user-1"],
  commentCount: 2,
  articleImg: `/blog-${id}.jpg`,
  createdAt: "2025-01-01",
  author: {
    authorImg: `/author-${id}.jpg`,
    firstName: `First${id}`,
    lastName: `Last${id}`,
  },
});

const authors = [
  {
    _id: "author-1",
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    authorImg: "/ada.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [buildBlog(1)],
  },
];

describe("Seacrh components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubscribeHook.mockReturnValue({
      mutateAsync: mockSubscribeMutateAsync,
      isPending: false,
    });
    mockAUserHook.mockReturnValue({
      data: { user: { loved: [buildBlog(1)], bookmarked: [buildBlog(2)] } },
      isSuccess: true,
      isError: false,
    });
  });

  it("renders fetched blogs in AllBlogs", async () => {
    mockBlogsHook.mockReturnValue({
      data: { blogs: [buildBlog(1)] },
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(<AllBlogs />);

    expect(await screen.findByText(/search result title number 1/i)).toBeInTheDocument();
    expect(screen.getByText(/formatted-2025-01-01/i)).toBeInTheDocument();
  });

  it("dispatches filtered search results from SearchHero", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(
      <SearchHero allBlogs={[buildBlog(1), buildBlog(2)]} />
    );

    await user.type(screen.getByPlaceholderText(/search blog/i), "number 2");

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "DISPLAY_BLOG_ARRAY",
        payload: {
          displayBlogArray: [buildBlog(2)],
          searching: true,
        },
      });
    });
    expect(screen.getByText(/we found 1 results for/i)).toBeInTheDocument();
  });

  it("renders saved and favorite cards via their dedicated components", () => {
    const userData = { email: "a@b.com", loved: [buildBlog(1)], bookmarked: [buildBlog(2)] };

    render(<Favourites favoriteBlogs={userData} isError={false} />);
    expect(screen.getByText(/search result title number 1/i)).toBeInTheDocument();

    render(<Bookmarks savedBlogs={userData} isError={false} />);
    expect(screen.getByText(/search result title number 2/i)).toBeInTheDocument();
  });

  it("renders explore authors from the authors hook", async () => {
    mockAuthorsHook.mockReturnValue({
      data: { authors },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<ExploreAuthors />);

    expect(await screen.findByText(/explore authors/i)).toBeInTheDocument();
    expect(screen.getByText(/ada lovelace/i)).toBeInTheDocument();
    expect(screen.getByText(/1 author/i)).toBeInTheDocument();
  });

  it("submits the discover newsletter form", async () => {
    const user = userEvent.setup();
    mockSubscribeMutateAsync.mockResolvedValue({
      subscriber: true,
      message: "Subscribed",
    });

    render(<SearchNewsletter />);

    await user.type(screen.getByPlaceholderText(/enter your email/i), "reader@example.com");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockSubscribeMutateAsync).toHaveBeenCalledWith({
        email: "reader@example.com",
      });
    });
  });

  it("wires DiscoverPageCont children together from blog data", async () => {
    mockBlogsHook.mockReturnValue({
      data: { blogs: [buildBlog(1), buildBlog(2)] },
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    renderWithAppContext(<DiscoverPageCont />, {
      state: {
        displayBlogArray: [buildBlog(1), buildBlog(2)],
        searching: false,
      },
    });

    expect(await screen.findByPlaceholderText(/search blog/i)).toBeInTheDocument();
    expect(screen.getByTestId("article-section-stub")).toHaveTextContent("2 false false");
    expect(screen.getByTestId("become-author-stub")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /join our newsletter/i })).toBeInTheDocument();
  });
});
