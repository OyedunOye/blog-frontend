import {
  checkContentWordLim,
  editPasswordFormSchema,
  loginFormSchema,
  newBlogFormSchema,
  newCommentFormSchema,
  signUpFormSchema,
  subscribeFormSchema,
  validateOtpFormSchema,
} from "@/zodValidations/auth/constant";

describe("zod auth constants", () => {
  it("validates login and subscription payloads", () => {
    expect(
      loginFormSchema.safeParse({
        email: "user@example.com",
        password: "password123",
        recaptchaValue: "recaptcha-token",
      }).success
    ).toBe(true);
    expect(subscribeFormSchema.safeParse({ email: "user@example.com" }).success).toBe(
      true
    );
    expect(validateOtpFormSchema.safeParse({ otp: "123456" }).success).toBe(true);
  });

  it("rejects login payloads that omit the recaptcha value", () => {
    const result = loginFormSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects mismatched signup passwords", () => {
    const result = signUpFormSchema.safeParse({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      password: "password123",
      confirmPassword: "different123",
      authorImg: undefined,
    });

    expect(result.success).toBe(false);
  });

  it("validates blog and comment forms", () => {
    expect(
      newBlogFormSchema.safeParse({
        title: "A valid title",
        blogContent: "A valid body content",
        category: "Programming",
        articleImg: [new File(["a"], "a.png", { type: "image/png" })],
      }).success
    ).toBe(true);

    expect(newCommentFormSchema.safeParse({ comment: "Nice" }).success).toBe(true);
  });

  it("validates matching password changes", () => {
    expect(
      editPasswordFormSchema.safeParse({
        oldPassword: "password123",
        newPassword: "newpassword123",
        confirmNewPassword: "newpassword123",
      }).success
    ).toBe(true);
  });

  it("checks minimum blog content words", () => {
    expect(checkContentWordLim("short content")).toBe("notEnough");
    expect(
      checkContentWordLim(Array.from({ length: 120 }, () => "word").join(" "))
    ).toBe("enough");
  });
});
