import * as React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockCreateBlogMutateAsync = jest.fn();
const mockCreateBlogHook = jest.fn();
const mockPush = jest.fn();
const mockToasterAlert = jest.fn();

jest.mock("next/dynamic", () => () => {
  return function MockQuill(props: {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
  }) {
    return (
      <textarea
        aria-label="Blog content"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(event) => props.onChange?.(event.target.value)}
      />
    );
  };
});

jest.mock("@/hooks/blog/useCreateBlog", () => ({
  useCreateBlog: () => mockCreateBlogHook(),
}));

jest.mock("@/components/ui/select", () => {
  const SelectContext = React.createContext<(value: string) => void>(() => {});

  return {
    Select: ({
      children,
      onValueChange,
    }: {
      children: React.ReactNode;
      onValueChange: (value: string) => void;
    }) => (
      <SelectContext.Provider value={onValueChange}>
        <div>{children}</div>
      </SelectContext.Provider>
    ),
    SelectTrigger: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    SelectValue: ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>,
    SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectItem: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: string;
    }) => {
      const onValueChange = React.useContext(SelectContext);
      return (
        <button type="button" onClick={() => onValueChange(value)}>
          {children}
        </button>
      );
    },
  };
});

jest.mock("@/utils", () => ({
  toasterAlert: (...args: unknown[]) => mockToasterAlert(...args),
}));

jest.mock("@/components/modals/BlogContentTextColorWarning", () => {
  const MockBlogContentTextColorWarning = () => (
    <div data-testid="blog-color-warning">Blog color warning</div>
  );
  MockBlogContentTextColorWarning.displayName =
    "MockBlogContentTextColorWarning";
  return MockBlogContentTextColorWarning;
});

jest.mock("@/components/QuillCreateBlog/QuillCreateBlogForm", () => {
  const actual = jest.requireActual("@/components/QuillCreateBlog/QuillCreateBlogForm");
  return actual;
});

import QuillCreateBlogForm from "@/components/QuillCreateBlog/QuillCreateBlogForm";
import QuillCreateBlogPage from "@/components/QuillCreateBlog/QuilCreateBlogPage";
import { renderWithAppContext } from "@/test-utils/renderWithAppContext";
import { useRouter } from "next/navigation";

const longContent = Array.from({ length: 130 }, (_, index) => `word${index}`).join(
  " "
);

describe("QuillCreateBlog components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateBlogHook.mockReturnValue({
      isPending: false,
      mutateAsync: mockCreateBlogMutateAsync,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
    Object.defineProperty(URL, "createObjectURL", {
      writable: true,
      value: jest.fn(() => "blob:preview"),
    });
  });

  it("submits a valid new blog and redirects home", async () => {
    const user = userEvent.setup();
    mockCreateBlogMutateAsync.mockResolvedValue({
      blog: { id: "blog-1" },
      message: "Blog created",
    });

    const { dispatch } = renderWithAppContext(<QuillCreateBlogForm />, {
      state: { blogContentWarn: "No" },
    });

    await user.type(
      screen.getByRole("textbox", { name: /blog title/i }),
      "A test blog title"
    );
    fireEvent.change(screen.getByLabelText(/blog content/i), {
      target: { value: longContent },
    });
    await user.click(screen.getByRole("button", { name: "Programming" }));
    await user.upload(
      screen.getByLabelText(/article's cover image/i),
      new File(["cover"], "cover.png", { type: "image/png" })
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockCreateBlogMutateAsync).toHaveBeenCalledTimes(1);
    });

    const formData = mockCreateBlogMutateAsync.mock.calls[0][0] as FormData;
    expect(formData.get("title")).toBe("A test blog title");
    expect(formData.get("category")).toBe("Programming");
    expect(formData.get("readTime")).toBeTruthy();
    expect(dispatch).toHaveBeenCalledWith({
      type: "BLOGCONTENT_WARN",
      payload: "No",
    });
    expect(mockToasterAlert).toHaveBeenCalledWith("Blog created");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("shows a content warning when the blog body is too short", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<QuillCreateBlogForm />, {
      state: { blogContentWarn: "No" },
    });

    await user.type(
      screen.getByRole("textbox", { name: /blog title/i }),
      "Short blog"
    );
    fireEvent.change(screen.getByLabelText(/blog content/i), {
      target: { value: "too short" },
    });
    await user.click(screen.getByRole("button", { name: "Programming" }));
    await user.upload(
      screen.getByLabelText(/article's cover image/i),
      new File(["cover"], "cover.png", { type: "image/png" })
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockCreateBlogMutateAsync).not.toHaveBeenCalled();
    expect(mockToasterAlert).toHaveBeenCalledWith(
      "The blog content is not up to the minumum word requirement."
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: "BLOGCONTENT_WARN",
      payload: "Yes",
    });
  });

  it("renders the create-blog page shell and dispatches its helper actions", async () => {
    const user = userEvent.setup();
    const { dispatch } = renderWithAppContext(<QuillCreateBlogPage />, {
      state: {
        contentTextColorWarning: true,
        blogContentWarn: "No",
      },
    });

    expect(screen.getByTestId("blog-color-warning")).toBeInTheDocument();

    const svgIcons = document.querySelectorAll("svg");
    await user.click(svgIcons[0]);
    expect(dispatch).toHaveBeenCalledWith({
      type: "CONTENT_TEXT_COLOR_WARNING",
      payload: true,
    });

    await user.click(screen.getByRole("button", { name: /return home/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: "BLOGCONTENT_WARN",
      payload: "No",
    });
    expect(screen.getByText(/loading home page/i)).toBeInTheDocument();
  });
});
