import * as React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockEditBlogMutateAsync = jest.fn();
const mockEditBlogHook = jest.fn();
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

jest.mock("@/hooks/blog/useEditBlog", () => ({
  useEditBlog: () => mockEditBlogHook(),
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
      defaultValue?: string;
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

import QuillEditBlogForm from "@/components/QuillEditBlogForm/QuillEditBlogForm";
import { renderWithAppContext } from "@/test-utils/renderWithAppContext";
import { useRouter } from "next/navigation";

const longEditContent = Array.from({ length: 130 }, (_, index) => `edit${index}`).join(
  " "
);

describe("QuillEditBlogForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEditBlogHook.mockReturnValue({
      isPending: false,
      mutateAsync: mockEditBlogMutateAsync,
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
      value: jest.fn(() => "blob:edit-preview"),
    });
  });

  it("submits edited blog data and closes the modal", async () => {
    const user = userEvent.setup();
    mockEditBlogMutateAsync.mockResolvedValue({
      message: "Blog updated",
    });

    const { dispatch } = renderWithAppContext(<QuillEditBlogForm />, {
      state: {
        singleBlogDetail: {
          _id: "blog-7",
          title: "Existing title",
          blogContent: longEditContent,
          category: "Programming",
        },
      },
    });

    await user.clear(screen.getByRole("textbox", { name: /blog title/i }));
    await user.type(
      screen.getByRole("textbox", { name: /blog title/i }),
      "Updated title"
    );
    fireEvent.change(screen.getByLabelText(/blog content/i), {
      target: { value: longEditContent },
    });
    await user.upload(
      screen.getByLabelText(/article's cover image/i),
      new File(["cover"], "cover.png", { type: "image/png" })
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockEditBlogMutateAsync).toHaveBeenCalledTimes(1);
    });

    const payload = mockEditBlogMutateAsync.mock.calls[0][0];
    expect(payload.blogId).toBe("blog-7");
    expect(payload.blogData.get("title")).toBe("Updated title");
    expect(payload.blogData.get("readTime")).toBeTruthy();
    expect(dispatch).toHaveBeenCalledWith({
      type: "CLOSE_EDIT_MODAL",
      payload: {
        openEditModal: false,
        storedBlogId: null,
        SingleBlogDetail: null,
      },
    });
    expect(mockToasterAlert).toHaveBeenCalledWith("Blog updated");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("rejects short edited content", async () => {
    const user = userEvent.setup();
    renderWithAppContext(<QuillEditBlogForm />, {
      state: {
        singleBlogDetail: {
          _id: "blog-7",
          title: "Existing title",
          blogContent: "existing content",
          category: "Programming",
        },
      },
    });

    fireEvent.change(screen.getByLabelText(/blog content/i), {
      target: { value: "short text" },
    });
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockEditBlogMutateAsync).not.toHaveBeenCalled();
    expect(mockToasterAlert).toHaveBeenCalledWith(
      "The blog content is not up to the minumum word requirement."
    );
    expect(
      screen.getByText(/you need at least 120 words for the blog content/i)
    ).toBeInTheDocument();
  });
});
