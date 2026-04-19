const mockGetImpl = jest.fn();
const mockToast = jest.fn();
const mockGetDecodedTokenImpl = jest.fn();

function mockGet(...args: unknown[]) {
  return mockGetImpl(...args);
}

function mockGetDecodedToken(...args: unknown[]) {
  return mockGetDecodedTokenImpl(...args);
}

jest.mock("universal-cookie", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
}));

jest.mock("react-toastify", () => ({
  toast: (...args: unknown[]) => mockToast(...args),
}));

jest.mock("@/hooks/getDecodeToken/getDecodedToken", () => ({
  getDecodedToken: (...args: unknown[]) => mockGetDecodedToken(...args),
}));

import {
  formatDate,
  formatDate2,
  loggedInUserId,
  toasterAlert,
  userName,
} from "@/utils";
import {
  blogReadTime,
  formatTime,
  getInitials,
  limContentToThirtyWords,
  obscureMail,
  wordLimit,
} from "@/utils/helpers";

describe("utils", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetImpl.mockReset();
    mockGetDecodedTokenImpl.mockReset();
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("formats dates in both helpers", () => {
    expect(formatDate("2025-01-29T00:00:00.000Z")).toContain("29");
    expect(formatDate2("2025-01-29T00:00:00.000Z")).toContain("29");
  });

  it("returns initials and word-limited text", () => {
    expect(getInitials("Ada Lovelace")).toBe("AL");
    expect(wordLimit("one two three four five six seven")).toBe(
      "one two three four five six..."
    );
    expect(wordLimit("one two")).toBe("one two");
  });

  it("computes blog read time and content previews", () => {
    expect(blogReadTime(Array.from({ length: 250 }, () => "word").join(" "))).toBe(
      "2"
    );
    expect(
      limContentToThirtyWords(Array.from({ length: 31 }, () => "word").join(" "))
    ).toMatch(/\.\.\.$/);
  });

  it("obscures emails and formats time", () => {
    expect(obscureMail("reader@example.com")).toBe("rea*******@e****.com");
    expect(formatTime(125)).toBe("02:05");
  });

  it("shows toast notifications with the expected config", () => {
    toasterAlert("Hello");

    expect(mockToast).toHaveBeenCalledWith(
      "Hello",
      expect.objectContaining({
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        theme: "light",
      })
    );
  });

  it("returns the logged-in user's name and id from the token", () => {
    mockGetImpl.mockReturnValue("token-123");
    mockGetDecodedTokenImpl.mockReturnValue({
      id: "user-1",
      firstName: "Ada",
      lastName: "Lovelace",
    });

    expect(userName()).toBe("Ada Lovelace");
    expect(loggedInUserId()).toBe("user-1");
    expect(mockGetImpl).toHaveBeenCalledWith("token");
    expect(mockGetDecodedTokenImpl).toHaveBeenCalledWith("token-123");
  });

  it("returns empty user details when the token is missing or invalid", () => {
    mockGetImpl.mockReturnValueOnce(undefined);

    expect(loggedInUserId()).toBeNull();
    expect(userName()).toBeUndefined();

    mockGetImpl.mockReturnValue("token-123");
    mockGetDecodedTokenImpl.mockReturnValue(null);

    expect(userName()).toBe("");
  });
});
