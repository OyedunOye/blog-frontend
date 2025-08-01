import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),

  password: z.string().min(8, {
    message: "The password must be at least 8 characters",
  }),
});

export const signUpFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "Firstname must have at least 2 characters.",
      })
      .max(30, {
        message: "Firstname cannot exceed 30 characters.",
      }),

    lastName: z
      .string()
      .min(2, {
        message: "Lastname must have at least 2 characters.",
      })
      .max(30, {
        message: "Firstname cannot exceed 30 characters.",
      }),

    email: z.string().email({
      message: "Invalid email address.",
    }),

    password: z.string().min(8, {
      message: "The password must be at least 8 characters",
    }),

    confirmPassword: z.string().min(8, {
      message: "This must match the password provided above",
    }),

    authorImg: z.any(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const newBlogFormSchema = z.object({
  title: z.string().min(3, {
    message: "Blog title cannot be less than 3 characters.",
  }),

  blogContent: z.string().min(8, {
    message: "The content must be at least 8 characters long.",
  }),

  category: z.string().min(2, {
    message: "Category is required, please select one",
  }),

  articleImg: z.any().refine((file) => file?.[0], "Blog image is required"),
});

export const editBlogFormSchema = z.object({
  title: z.string().min(3, {
    message: "Blog title cannot be less than 3 characters.",
  }),

  blogContent: z.string(),

  category: z.string(),

  articleImg: z.any(),
});

export const checkContentWordLim = (blogContent: string): string => {
  const numOfWords = blogContent.trim().split(" ").length;
  if (numOfWords < 120) {
    return "notEnough";
  }
  return "enough";
};

export const newCommentFormSchema = z.object({
  comment: z.string().min(2, {
    message: "Your comment cannot be less than 2 characters",
  }),
});

export const editUserProfileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name cannot be less than 2 characters.",
  }),

  lastName: z.string().min(2, {
    message: "First name cannot be less than 2 characters.",
  }),

  email: z.string().email(),

  authorImg: z.any(),

  removeProfilePic: z.boolean().default(false).optional(),
});

export const editPasswordFormSchema = z.object({
  oldPassword: z.string().min(8, {
    message: "The password must be at least 8 characters",
  }),

  newPassword: z.string().min(8, {
    message: "The password must be at least 8 characters",
  }),

  confirmNewPassword: z.string()
})
// .refine((conf) => conf===newPassword, "This must match the password provided above"),
.refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});


export const subscribeFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export const validateOtpFormSchema = z.object({
  otp: z.string().length(6,{
    message: "6 digits OTP code is required.",
  }),
});