import AvatarRenderer from "@/components/common/Avatar";
import CleanSlate from "@/components/common/CleanSlate";
import DotDivider from "@/components/common/DotDivider";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loader";
import MaxWidth from "@/components/common/MaxWidthWrapper";
import NoServerConnectionWarning from "@/components/common/NoServerConnectionWarning";
import { render, screen } from "@testing-library/react";

describe("common components", () => {
  it("renders MaxWidth with children and custom class names", () => {
    const { container } = render(
      <MaxWidth className="custom-shell">
        <span>Wrapped content</span>
      </MaxWidth>
    );

    expect(screen.getByText("Wrapped content")).toBeInTheDocument();
    expect(container.querySelector(".custom-shell")).toBeInTheDocument();
  });

  it("renders Footer with key navigation and contact links", () => {
    render(<Footer />);

    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/OyedunOye"
    );
    expect(
      screen.getByRole("link", { name: /privacy policy/i })
    ).toHaveAttribute("href", "/privacy-policy");
    expect(
      screen.getByText((_, node) =>
        node?.textContent === `©${new Date().getFullYear()}`
      )
    ).toBeInTheDocument();
  });

  it("renders avatar fallback text", () => {
    render(<AvatarRenderer src="/avatar.png" fallBack="OO" />);

    expect(screen.getByText("OO")).toBeInTheDocument();
  });

  it("renders loader message", () => {
    render(<Loading message="Loading profile" />);

    expect(screen.getByText("Loading profile")).toBeInTheDocument();
  });

  it("renders CleanSlate message and illustration", () => {
    render(<CleanSlate message="Nothing has been published yet." />);

    expect(screen.getByText("Nothing has been published yet.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /warning sign/i })).toHaveAttribute(
      "src",
      "/freshstart.jpeg"
    );
  });

  it("renders the no-server warning illustration and message", () => {
    render(<NoServerConnectionWarning message="Server unavailable" />);

    expect(screen.getByText("Server unavailable")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /warning sign/i })).toHaveAttribute(
      "src",
      "/warning-sign.webp"
    );
  });

  it("renders a dot divider marker", () => {
    const { container } = render(<DotDivider />);

    expect(container.querySelector(".rounded-full")).toBeInTheDocument();
  });
});
