import { z } from "zod";

// Create a Zod schema
export const SignUpFormSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .nonempty("Full name is required"),
  // masterPassword: z
  //   .string()
  //   .min(8, "Master password must be at least 8 characters")
  //   .max(32, "Master password cannot exceed 32 characters")
  //   .regex(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
  //     "Master password must contain at least one lowercase, one uppercase, one number, and one special character",
  //   )
  //   .nonempty("Master password is required"),
  // confirmMasterPassword: z.string().nonempty("Please confirm your password"),
  // masterPasswordHint: z
  //   .string()
  //   .min(5, "Password hint must be at least 5 characters")
  //   .nonempty("Master password hint is required"),
  isAgreed: z
    .boolean()
    .refine((val) => val, "You must agree to the terms and conditions")
    .refine((val) => val, "Agreement is required."),
});
// .superRefine((val, ctx) => {
//   if (val.masterPassword !== val.confirmMasterPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Password is not the same as confirm password",
//     });
//   }
// });
