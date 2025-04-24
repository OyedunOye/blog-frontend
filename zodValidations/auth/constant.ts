import { z } from 'zod'


export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address."
  }),

  password: z.string().min(8, {
    message: "The password must be at least 8 characters"
  })

})


export const signUpFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Firstname must have at least 2 characters."
  }).max(30, {
    message: "Firstname cannot exceed 30 characters."
  }),

  lastName: z.string().min(2, {
    message: "Lastname must have at least 2 characters."
  }).max(30, {
    message: "Firstname cannot exceed 30 characters."
  }),

  email: z.string().email({
    message: "Invalid email address."
  }),

  password: z.string().min(8, {
    message: "The password must be at least 8 characters"
  }),

  confirmPassword: z.string().min(8, {
    message: "This must match the password provided above"
  }),

  authorImg: z.any()

}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})


export const newBlogFormSchema = z.object({
  title: z.string().min(3, {
    message: "Blog title cannot be less than 3 characters."
  }),

  blogContent: z.string().min(8, {
    message: "The content must be at least 8 characters long."
  }),

  readTime: z.string().refine((val)=>/^[1-9]\d*$/.test(val), {
    message: 'Please enter a positive integer',
  }),

  articleImg: z.any().refine((file) => file?.[0], 'Blog image is required')

})