import axios from "axios";

const mockGetImpl = jest.fn();

function mockGet(...args: unknown[]) {
  return mockGetImpl(...args);
}

jest.mock("axios");
jest.mock("universal-cookie", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
}));

jest.mock("@/utils", () => ({
  getToken: jest.fn(async () => "token-123"),
}));

import {
  createBlog,
  createBlogComment,
  deleteBlog,
  deleteComment,
  editBlog,
  editComment,
  getAllBlogs,
  getASingleBlog,
  getBlogCategoryCount,
  toggleBookmarkABlog,
  toggleLoveABlog,
} from "@/services/blog.services";
import {
  resendOtp,
  userLogin,
  verifyOtpAndLogin,
} from "@/services/login.services";
import {
  subscribeToNewsletter,
  unsubscribeToNewsletter,
} from "@/services/subscribe.services";
import {
  changeUserPassword,
  createUser,
  deactivateUserAccount,
  getAllAuthors,
  getAUser,
  toggleTwoFA,
  updateUserProfile,
} from "@/services/users.service";

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("services", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetImpl.mockResolvedValue("token-123");
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("calls login and subscribe endpoints with JSON headers", async () => {
    mockedAxios.post.mockResolvedValue({ data: { ok: true } });
    mockedAxios.patch.mockResolvedValue({ data: { ok: true } });

    await userLogin({ email: "a", password: "b" });
    await verifyOtpAndLogin({ otp: "123456" });
    await resendOtp({ email: "a" });
    await subscribeToNewsletter({ email: "a" });
    await unsubscribeToNewsletter({ email: "a" });

    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("login"),
      { email: "a", password: "b" },
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("login/validate-otp"),
      { otp: "123456" },
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining("login/resend-otp"),
      { email: "a" },
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      4,
      expect.stringContaining("subscribers"),
      { email: "a" },
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("subscribers/unsubscribe"),
      { email: "a" },
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("calls blog endpoints with tokenized headers", async () => {
    mockedAxios.post.mockResolvedValue({ data: { ok: true } });
    mockedAxios.get.mockResolvedValue({ data: { ok: true } });
    mockedAxios.patch.mockResolvedValue({ data: { ok: true } });
    mockedAxios.delete.mockResolvedValue({ data: { ok: true } });

    await createBlog(new FormData());
    await getAllBlogs();
    await getBlogCategoryCount();
    await getASingleBlog("blog-1");
    await editBlog({ blogId: "blog-1", blogData: new FormData() });
    await deleteBlog("blog-1");
    await createBlogComment({ blogId: "blog-1", comment: { comment: "hi" } });
    await toggleLoveABlog("blog-1");
    await toggleBookmarkABlog("blog-1");
    await editComment({ comment: "hello" });
    await deleteComment({ commentId: "1" });

    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("blogs"),
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
          "Content-Type": "multipart/form-data",
        }),
      })
    );
    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("blogs/comment/blog-1"),
      { comment: "hi" },
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
          "Content-Type": "application/json",
        }),
      })
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("blogs/blog-1"));
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("blogs/blog-1"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
        }),
      })
    );
  });

  it("calls user endpoints with the expected headers", async () => {
    mockedAxios.post.mockResolvedValue({ data: { ok: true } });
    mockedAxios.get.mockResolvedValue({ data: { ok: true } });
    mockedAxios.patch.mockResolvedValue({ data: { ok: true } });

    await createUser(new FormData());
    await getAllAuthors();
    await getAUser();
    await changeUserPassword({ password: "newpass" });
    await toggleTwoFA({ status: true });
    await updateUserProfile(new FormData());
    await deactivateUserAccount();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("users"),
      expect.anything(),
      expect.objectContaining({
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("users/profile"),
      expect.objectContaining({
        headers: { Authorization: "Bearer token-123" },
      })
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("users/deactivate-profile"),
      {},
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
        }),
      })
    );
  });

  it("returns fallback error payloads for guarded service functions", async () => {
    mockedAxios.patch.mockRejectedValue({
      response: { data: { error: "bad request" } },
    });
    mockedAxios.post.mockRejectedValue({
      response: { data: { error: "otp invalid" } },
    });

    await expect(deleteComment({})).resolves.toEqual({ error: "bad request" });
    await expect(editComment({})).resolves.toEqual({ error: "bad request" });
    await expect(unsubscribeToNewsletter({ email: "a" })).resolves.toEqual({
      error: "bad request",
    });
    await expect(verifyOtpAndLogin({ otp: "123" })).resolves.toEqual({
      error: "otp invalid",
    });
  });
});
