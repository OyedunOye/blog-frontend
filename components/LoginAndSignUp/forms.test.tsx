import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockLoginMutateAsync = jest.fn();
const mockRegisterMutateAsync = jest.fn();
const mockLoginHook = jest.fn();
const mockRegisterHook = jest.fn();
const mockToasterAlert = jest.fn();
const mockPush = jest.fn();
const mockSetCookie = jest.fn();

jest.mock("@/hooks/auth/useLogUserIn", () => ({
  useLogUserIn: () => mockLoginHook(),
}));

jest.mock("@/hooks/auth/useRegisterUser", () => ({
  useRegisterUser: () => mockRegisterHook(),
}));

jest.mock("@/utils", () => ({
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

jest.mock("cookies-next/client", () => ({
  setCookie: (...args: unknown[]) => mockSetCookie(...args),
}));

jest.mock("@/components/modals/TwoFaModal", () => ({
  __esModule: true,
  default: ({ email }: { email: string }) => (
    <div data-testid="two-fa-modal">2FA modal for {email}</div>
  ),
}));

import LoginForm from "@/components/LoginAndSignUp/LoginForm";
import SignUpForm from "@/components/LoginAndSignUp/SignUpForm";
import { useRouter } from "next/navigation";

describe("LoginAndSignUp forms", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoginHook.mockReturnValue({
      isPending: false,
      mutateAsync: mockLoginMutateAsync,
      data: undefined,
    });
    mockRegisterHook.mockReturnValue({
      isPending: false,
      mutateAsync: mockRegisterMutateAsync,
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

  it("logs a user in, sets the auth cookie, and redirects home", async () => {
    const user = userEvent.setup();
    mockLoginMutateAsync.mockResolvedValue({
      token: "token-123",
      message: "Logged in successfully",
    });

    render(<LoginForm />);

    await user.type(
      screen.getByRole("textbox", { name: /email address/i }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(mockLoginMutateAsync).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
    expect(mockSetCookie).toHaveBeenCalledWith("token", "token-123");
    expect(mockToasterAlert).toHaveBeenCalledWith("Logged in successfully");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("opens the 2FA modal when the login response requests OTP validation", async () => {
    const user = userEvent.setup();
    mockLoginMutateAsync.mockResolvedValue({
      email: "user@example.com",
    });

    render(<LoginForm />);

    await user.type(
      screen.getByRole("textbox", { name: /email address/i }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByTestId("two-fa-modal")).toHaveTextContent(
      "2FA modal for user@example.com",
    );
  });

  it("registers a new user and redirects to login", async () => {
    const user = userEvent.setup();
    mockRegisterMutateAsync.mockResolvedValue({
      user: { id: "user-1" },
      message: "Account created",
    });
    const createObjectURLMock = jest.fn(() => "blob:preview");
    Object.defineProperty(URL, "createObjectURL", {
      writable: true,
      value: createObjectURLMock,
    });

    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(
      screen.getByRole("textbox", { name: /email address/i }),
      "jane@example.com",
    );
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    await user.upload(screen.getByLabelText(/profile picture/i), file);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(mockRegisterMutateAsync).toHaveBeenCalledTimes(1);
    });

    const submittedFormData = mockRegisterMutateAsync.mock
      .calls[0][0] as FormData;
    expect(submittedFormData.get("firstName")).toBe("Jane");
    expect(submittedFormData.get("lastName")).toBe("Doe");
    expect(submittedFormData.get("email")).toBe("jane@example.com");
    expect(submittedFormData.get("password")).toBe("password123");
    expect(submittedFormData.get("authorImg")).toBe(file);
    expect(mockToasterAlert).toHaveBeenCalledWith("Account created");
    expect(mockPush).toHaveBeenCalledWith("/login");

    expect(createObjectURLMock).toHaveBeenCalled();
  });
});
