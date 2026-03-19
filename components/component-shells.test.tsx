import Videos from "@/components/Home/Videos";
import LoginButtons from "@/components/LoginAndSignUp/LoginButtons";
import LoginPage from "@/components/LoginAndSignUp/LoginPage";
import SignUpButtons from "@/components/LoginAndSignUp/SignUpButtons";
import SignUpPage from "@/components/LoginAndSignUp/SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockToasterAlert = jest.fn();

jest.mock("@/components/LoginAndSignUp/LoginForm", () => {
  const MockLoginForm = () => <div data-testid="login-form">Login form</div>;
  MockLoginForm.displayName = "MockLoginForm";
  return MockLoginForm;
});

jest.mock("@/components/LoginAndSignUp/SignUpForm", () => {
  const MockSignUpForm = () => (
    <div data-testid="sign-up-form">Sign up form</div>
  );
  MockSignUpForm.displayName = "MockSignUpForm";
  return MockSignUpForm;
});

jest.mock("@/utils", () => ({
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

describe("page-shell components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the videos section", () => {
    render(<Videos />);

    expect(screen.getByText(/the videos/i)).toBeInTheDocument();
    expect(screen.getByText(/your browser does not support the video tag/i)).toBeInTheDocument();
  });

  it("announces social login as coming soon", async () => {
    const user = userEvent.setup();
    render(<LoginButtons />);

    await user.click(screen.getByRole("button", { name: /continue with google/i }));

    expect(mockToasterAlert).toHaveBeenCalledWith(
      "Login with Google is coming soon! Please login with an email and a password."
    );
  });

  it("announces social sign-up as coming soon", async () => {
    const user = userEvent.setup();
    render(<SignUpButtons />);

    await user.click(screen.getByRole("button", { name: /continue with google/i }));

    expect(mockToasterAlert).toHaveBeenCalledWith(
      "Sign up with Google is coming soon! Please open your account with an email and a password."
    );
  });

  it("renders the login page shell and shows loading copy after navigation click", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    expect(screen.getByTestId("login-form")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /return home/i }));

    expect(screen.getByText(/loading home page/i)).toBeInTheDocument();
  });

  it("renders the sign-up page shell and shows loading copy after navigation click", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    expect(screen.getByTestId("sign-up-form")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /already have an account\? sign in/i }));

    expect(screen.getByText(/navigating to login page/i)).toBeInTheDocument();
  });
});
