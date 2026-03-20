import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";

const mockJwtDecode = jest.fn();

jest.mock("jwt-decode", () => ({
  jwtDecode: (...args: unknown[]) => mockJwtDecode(...args),
}));

describe("getDecodedToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns decoded payloads", () => {
    mockJwtDecode.mockReturnValue({
      id: "user-1",
      email: "ada@example.com",
      firstName: "Ada",
      lastName: "Lovelace",
      authorImg: "",
      iat: 1,
      exp: 2,
    });

    expect(getDecodedToken("token")).toEqual(
      expect.objectContaining({ id: "user-1", firstName: "Ada" })
    );
  });

  it("returns null for invalid tokens", () => {
    mockJwtDecode.mockImplementation(() => {
      throw new Error("bad token");
    });

    expect(getDecodedToken("bad")).toBeNull();
  });
});
