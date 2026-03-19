import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockUnsubscribeMutateAsync = jest.fn();
const mockUnsubscribeHook = jest.fn();
const mockPush = jest.fn();
const mockToasterAlert = jest.fn();

jest.mock("@/hooks/subscribe/useUnsubscribeToNewsletter", () => ({
  useUnsubscribeToNewsletter: () => mockUnsubscribeHook(),
}));

jest.mock("@/utils", () => ({
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

jest.mock("@/components/Unsubscribe/Unsubscribe", () => {
  const actual = jest.requireActual("@/components/Unsubscribe/Unsubscribe");
  return actual;
});

import Unsubscribe from "@/components/Unsubscribe/Unsubscribe";
import UnsubscribePageClient from "@/components/Unsubscribe/UnsubscribePageClient";
import { useRouter, useSearchParams } from "next/navigation";
import { render } from "@testing-library/react";

describe("Unsubscribe components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUnsubscribeHook.mockReturnValue({
      mutateAsync: mockUnsubscribeMutateAsync,
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

  it("submits an unsubscribe request and redirects home", async () => {
    const user = userEvent.setup();
    mockUnsubscribeMutateAsync.mockResolvedValue({
      email: "reader@example.com",
      message: "Subscription cancelled",
    });

    render(<Unsubscribe email="reader@example.com" />);

    expect(screen.getByDisplayValue("reader@example.com")).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: /unsubscribe/i })[0]);

    await waitFor(() => {
      expect(mockUnsubscribeMutateAsync).toHaveBeenCalledWith({
        email: "reader@example.com",
      });
    });
    expect(mockToasterAlert).toHaveBeenCalledWith("Subscription cancelled");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("shows the home loading state when home is clicked", async () => {
    const user = userEvent.setup();
    render(<Unsubscribe email="reader@example.com" />);

    await user.click(screen.getByRole("button", { name: /home/i }));

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("passes the email query string into the page client", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("email=query@example.com")
    );

    render(<UnsubscribePageClient />);

    expect(screen.getByDisplayValue("query@example.com")).toBeInTheDocument();
  });
});
