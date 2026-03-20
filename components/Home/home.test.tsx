import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockCategoryHook = jest.fn();
const mockBlogsHook = jest.fn();
const mockAuthorsHook = jest.fn();
const mockSubscribeMutateAsync = jest.fn();
const mockSubscribeHook = jest.fn();
const mockPush = jest.fn();
const mockToasterAlert = jest.fn();

jest.mock("@/hooks/blog/useGetBlogCategoryCount", () => ({
  useGetBlogCategoryCount: () => mockCategoryHook(),
}));

jest.mock("@/hooks/blog/useGetBlogs", () => ({
  useGetAllBlogs: () => mockBlogsHook(),
}));

jest.mock("@/hooks/authors/useGetAllAuthors", () => ({
  useGetAllAuthors: () => mockAuthorsHook(),
}));

jest.mock("@/hooks/subscribe/useSubscribeToNewsletter", () => ({
  useSubscribeToNewsletter: () => mockSubscribeHook(),
}));

jest.mock("@/utils", () => ({
  formatDate: (value: string) => `formatted-${value}`,
  loggedInUserId: () => "user-1",
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

import { ArticleCards } from "@/components/Home/ArticleCards";
import Categories from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import LatestArticles from "@/components/Home/LatestArticles";
import Subscribe from "@/components/Home/Subscribe";
import TheAuthors from "@/components/Home/TheAuthors";
import { useRouter } from "next/navigation";

type Blog = {
  _id: string;
  title: string;
  blogContent: string;
  readTime: string;
  category: string;
  loveCount: number;
  loves: string[];
  bookmarks: string[];
  commentCount: number;
  articleImg: string;
  createdAt: string;
  author: {
    authorImg: string;
    firstName: string;
    lastName: string;
  };
};

const buildBlog = (index: number): Blog => ({
  _id: `blog-${index}`,
  title: `A richly detailed article title number ${index}`,
  blogContent: `Blog content ${index}`,
  readTime: `${index}`,
  category: index % 2 === 0 ? "Programming" : "Travel",
  loveCount: index,
  loves: index === 1 ? ["user-1"] : [],
  bookmarks: index === 1 ? ["user-1"] : [],
  commentCount: index + 2,
  articleImg: `/article-${index}.jpg`,
  createdAt: `2025-01-0${Math.min(index, 9)}`,
  author: {
    authorImg: `/author-${index}.jpg`,
    firstName: `Author${index}`,
    lastName: `Writer${index}`,
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
    blogs: [
      {
        _id: "blog-a",
        title: "How I write",
        blogContent: "content",
        articleImg: "/ada-blog.jpg",
        category: "Programming",
        createdAt: "2025-01-01",
      },
    ],
  },
  {
    _id: "author-2",
    firstName: "Grace",
    lastName: "Hopper",
    email: "grace@example.com",
    authorImg: "/grace.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [
      {
        _id: "blog-b",
        title: "Compilers and clarity",
        blogContent: "content",
        articleImg: "/grace-blog.jpg",
        category: "Programming",
        createdAt: "2025-01-01",
      },
    ],
  },
  {
    _id: "author-3",
    firstName: "Linus",
    lastName: "Torvalds",
    email: "linus@example.com",
    authorImg: "/linus.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [
      {
        _id: "blog-c",
        title: "Open source notes",
        blogContent: "content",
        articleImg: "/linus-blog.jpg",
        category: "Technology",
        createdAt: "2025-01-01",
      },
    ],
  },
  {
    _id: "author-4",
    firstName: "Margaret",
    lastName: "Hamilton",
    email: "margaret@example.com",
    authorImg: "/margaret.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [
      {
        _id: "blog-d",
        title: "Reliable systems",
        blogContent: "content",
        articleImg: "/margaret-blog.jpg",
        category: "Technology",
        createdAt: "2025-01-01",
      },
    ],
  },
  {
    _id: "author-5",
    firstName: "Barbara",
    lastName: "Liskov",
    email: "barbara@example.com",
    authorImg: "/barbara.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [
      {
        _id: "blog-e",
        title: "Abstractions matter",
        blogContent: "content",
        articleImg: "/barbara-blog.jpg",
        category: "Programming",
        createdAt: "2025-01-01",
      },
    ],
  },
  {
    _id: "author-6",
    firstName: "Edsger",
    lastName: "Dijkstra",
    email: "edsger@example.com",
    authorImg: "/edsger.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [
      {
        _id: "blog-f",
        title: "Structured thinking",
        blogContent: "content",
        articleImg: "/edsger-blog.jpg",
        category: "Programming",
        createdAt: "2025-01-01",
      },
    ],
  },
  {
    _id: "author-7",
    firstName: "Donald",
    lastName: "Knuth",
    email: "donald@example.com",
    authorImg: "/donald.jpg",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    blogs: [
      {
        _id: "blog-g",
        title: "Careful typesetting",
        blogContent: "content",
        articleImg: "/donald-blog.jpg",
        category: "Programming",
        createdAt: "2025-01-01",
      },
    ],
  },
];

describe("Home components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubscribeHook.mockReturnValue({
      mutateAsync: mockSubscribeMutateAsync,
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

  it("renders category counts from the category-count hook", () => {
    mockCategoryHook.mockReturnValue({
      data: {
        Programming: 1,
        Travel: 3,
        Food: 0,
        Technology: 2,
        Lifestyle: 1,
        Others: 4,
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<Categories />);

    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.getAllByText("1 article").length).toBeGreaterThan(0);
    expect(screen.getByText("3 articles")).toBeInTheDocument();
  });

  it("renders the category warning state when the request fails", () => {
    mockCategoryHook.mockReturnValue({
      data: undefined,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });

    render(<Categories />);

    expect(
      screen.getByText(/unable to load the categories section/i),
    ).toBeInTheDocument();
  });

  it("shows an offline toast when create-blog is clicked without a token", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(
      screen.getByRole("button", { name: /create a new blog/i }),
    );

    expect(mockToasterAlert).toHaveBeenCalledWith(
      "You are offline. Please login to be able to create a blog post!",
    );
  });

  it("submits the newsletter form and resets on success", async () => {
    const user = userEvent.setup();
    mockSubscribeMutateAsync.mockResolvedValue({
      subscriber: true,
      message: "Subscribed successfully",
    });

    render(<Subscribe />);

    const emailInput = screen.getByPlaceholderText("Email");
    await user.type(emailInput, "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(mockSubscribeMutateAsync).toHaveBeenCalledWith({
        email: "reader@example.com",
      });
    });
    expect(mockToasterAlert).toHaveBeenCalledWith("Subscribed successfully");
    await waitFor(() => {
      expect(emailInput).toHaveValue("");
    });
  });

  it("renders authors and toggles between compact and full lists", async () => {
    const user = userEvent.setup();
    mockAuthorsHook.mockReturnValue({
      data: { authors },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<TheAuthors />);

    expect(await screen.findByText(/7 authors/i)).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.queryByText("Donald Knuth")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /view all/i }));

    expect(screen.getByText("Donald Knuth")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /minimize/i }));

    expect(screen.queryByText("Donald Knuth")).not.toBeInTheDocument();
  });

  it("renders the empty authors state when there are no authors", async () => {
    mockAuthorsHook.mockReturnValue({
      data: { authors: [] },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<TheAuthors />);

    expect(
      await screen.findByText(/no authors are available in our server/i),
    ).toBeInTheDocument();
  });

  it("renders article cards from the secondary blog list", async () => {
    mockBlogsHook.mockReturnValue({
      data: {
        blogs: Array.from({ length: 6 }, (_, index) => buildBlog(index + 1)),
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<ArticleCards />);

    expect(
      await screen.findByRole("link", {
        name: /a richly detailed article title number 2/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/formatted-2025-01-02/i)).toBeInTheDocument();
    expect(screen.getByText(/author2 writer2/i)).toBeInTheDocument();
  });

  it("renders the latest articles section with featured and remaining cards", async () => {
    mockBlogsHook.mockReturnValue({
      data: {
        blogs: Array.from({ length: 7 }, (_, index) => buildBlog(index + 1)),
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<LatestArticles />);

    expect(await screen.findByText(/latest articles/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/a richly detailed article title number/i).length,
    ).toBeGreaterThan(1);
    expect(
      screen.getByRole("link", {
        name: /a richly detailed article title number 1/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the latest articles empty state when no blogs exist", async () => {
    mockBlogsHook.mockReturnValue({
      data: { blogs: [] },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<LatestArticles />);

    expect(
      await screen.findByText(/there are no blogs on the site at the moment/i),
    ).toBeInTheDocument();
  });
});
