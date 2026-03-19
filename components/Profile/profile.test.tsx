import Dashboard from "@/components/Profile/Dashboard";
import DeleteAccount from "@/components/Profile/DeleteAccount";
import ToggleSwitch from "@/components/Profile/ToggleSwitch";
import WorkInProgress from "@/components/Profile/WorkInProgress";
import { renderWithAppContext } from "@/test-utils/renderWithAppContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/components/modals/DeactivateUserConfirmation", () => {
  const MockDeactivateUserConfirmation = () => (
    <div data-testid="deactivate-user-confirmation">Deactivate modal</div>
  );
  MockDeactivateUserConfirmation.displayName =
    "MockDeactivateUserConfirmation";
  return MockDeactivateUserConfirmation;
});

describe("profile components", () => {
  it("renders the dashboard illustration and empty state copy", () => {
    render(<Dashboard />);

    expect(
      screen.getByRole("img", { name: /group of friends smiling/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/nothing to see here/i)).toBeInTheDocument();
  });

  it("renders the work-in-progress notice", () => {
    render(<WorkInProgress />);

    expect(screen.getByText(/delete your account/i)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /work in progress illustration/i })
    ).toBeInTheDocument();
  });

  it("applies the checked styling and triggers its click handler", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <ToggleSwitch defaultChecked pointer onClick={handleClick} />
    );

    const toggle = screen.getByRole("button");
    expect(toggle.className).toContain("bg-indigo-600");
    expect(toggle.className).toContain("cursor-pointer");

    await user.click(toggle);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("opens the deactivate account confirmation via context dispatch", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<DeleteAccount />);

    await user.click(
      screen.getByRole("button", { name: /deactivate account/i })
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: "CONFIRM_DELETE",
      payload: {
        deleteModal: true,
      },
    });
  });

  it("renders the deactivate confirmation modal when the flag is enabled", () => {
    renderWithAppContext(<DeleteAccount />, {
      state: { deleteModal: true },
    });

    expect(
      screen.getByTestId("deactivate-user-confirmation")
    ).toBeInTheDocument();
  });
});
