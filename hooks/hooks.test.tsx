import React from "react";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: jest.fn(),
    useQuery: jest.fn(),
  };
});

jest.mock("@/services/blog.services", () => ({
  createBlog: jest.fn(),
  createBlogComment: jest.fn(),
  deleteBlog: jest.fn(),
  deleteComment: jest.fn(),
  editBlog: jest.fn(),
  editComment: jest.fn(),
  getAllBlogs: jest.fn(),
  getASingleBlog: jest.fn(),
  getBlogCategoryCount: jest.fn(),
  toggleBookmarkABlog: jest.fn(),
  toggleLoveABlog: jest.fn(),
}));

jest.mock("@/services/login.services", () => ({
  userLogin: jest.fn(),
  verifyOtpAndLogin: jest.fn(),
  resendOtp: jest.fn(),
}));

jest.mock("@/services/subscribe.services", () => ({
  subscribeToNewsletter: jest.fn(),
  unsubscribeToNewsletter: jest.fn(),
}));

jest.mock("@/services/users.service", () => ({
  changeUserPassword: jest.fn(),
  createUser: jest.fn(),
  deactivateUserAccount: jest.fn(),
  getAllAuthors: jest.fn(),
  getAUser: jest.fn(),
  toggleTwoFA: jest.fn(),
  updateUserProfile: jest.fn(),
}));

import * as blogServices from "@/services/blog.services";
import * as loginServices from "@/services/login.services";
import * as subscribeServices from "@/services/subscribe.services";
import * as userServices from "@/services/users.service";

import { useChangePassword } from "@/hooks/auth/useChangePassword";
import { useLogUserIn } from "@/hooks/auth/useLogUserIn";
import { useRegisterUser } from "@/hooks/auth/useRegisterUser";
import { useResendOtp } from "@/hooks/auth/useResendOtp";
import { useToggleTwoFA } from "@/hooks/auth/useToggleTwoFA";
import { useVerifyOtpAndLogin } from "@/hooks/auth/useVerifyOtpAndLogin";
import { useDeactivateUserAccount } from "@/hooks/authors/useDeleteUserAccount";
import { useGetAllAuthors } from "@/hooks/authors/useGetAllAuthors";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import { useUpdateUserProfile } from "@/hooks/authors/useUpdateUserProfile";
import { useCreateBlog } from "@/hooks/blog/useCreateBlog";
import { useCreateBlogComment } from "@/hooks/blog/useCreateBlogComment";
import { useDeleteABlog } from "@/hooks/blog/useDeleteBlog";
import { useDeleteComment } from "@/hooks/blog/useDeleteComment";
import { useEditBlog } from "@/hooks/blog/useEditBlog";
import { useEditComment } from "@/hooks/blog/useEditComment";
import { useGetBlogCategoryCount } from "@/hooks/blog/useGetBlogCategoryCount";
import { useGetAllBlogs, useGetASingleBlog } from "@/hooks/blog/useGetBlogs";
import { useToggleBookmarkABlog } from "@/hooks/blog/useToggleBookmarkABlog";
import { useToggleLoveABlog } from "@/hooks/blog/useToggleLoveABlog";
import { useSubscribeToNewsletter } from "@/hooks/subscribe/useSubscribeToNewsletter";
import { useUnsubscribeToNewsletter } from "@/hooks/subscribe/useUnsubscribeToNewsletter";

const mockedUseMutation = useMutation as jest.Mock;
const mockedUseQuery = useQuery as jest.Mock;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe("React Query hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseMutation.mockReturnValue({ status: "ok" });
    mockedUseQuery.mockReturnValue({ status: "ok" });
  });

  it("wires mutation hooks to the expected service functions", () => {
    renderHook(() => useChangePassword(), { wrapper });
    renderHook(() => useLogUserIn(), { wrapper });
    renderHook(() => useRegisterUser(), { wrapper });
    renderHook(() => useResendOtp(), { wrapper });
    renderHook(() => useToggleTwoFA(), { wrapper });
    renderHook(() => useVerifyOtpAndLogin(), { wrapper });
    renderHook(() => useDeactivateUserAccount(), { wrapper });
    renderHook(() => useUpdateUserProfile(), { wrapper });
    renderHook(() => useCreateBlog(), { wrapper });
    renderHook(() => useCreateBlogComment(), { wrapper });
    renderHook(() => useDeleteABlog(), { wrapper });
    renderHook(() => useDeleteComment(), { wrapper });
    renderHook(() => useEditBlog(), { wrapper });
    renderHook(() => useEditComment(), { wrapper });
    renderHook(() => useToggleBookmarkABlog(), { wrapper });
    renderHook(() => useToggleLoveABlog(), { wrapper });
    renderHook(() => useSubscribeToNewsletter(), { wrapper });
    renderHook(() => useUnsubscribeToNewsletter(), { wrapper });

    expect(mockedUseMutation).toHaveBeenCalledWith(
      expect.objectContaining({ mutationFn: userServices.changeUserPassword })
    );
    expect(mockedUseMutation).toHaveBeenCalledWith(
      expect.objectContaining({ mutationFn: loginServices.userLogin })
    );
    expect(mockedUseMutation).toHaveBeenCalledWith(
      expect.objectContaining({ mutationFn: blogServices.createBlog })
    );
    expect(mockedUseMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: subscribeServices.unsubscribeToNewsletter,
      })
    );
  });

  it("wires query hooks to the expected service functions", () => {
    renderHook(() => useGetAllAuthors(), { wrapper });
    renderHook(() => useGetAUser(), { wrapper });
    renderHook(() => useGetBlogCategoryCount(), { wrapper });
    renderHook(() => useGetAllBlogs(), { wrapper });
    renderHook(() => useGetASingleBlog("blog-1"), { wrapper });

    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["allAuthors"],
        queryFn: userServices.getAllAuthors,
      })
    );
    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["blogs"],
        queryFn: blogServices.getAllBlogs,
      })
    );
    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["blogOfWeek", "blog-1"],
      })
    );
  });
});
