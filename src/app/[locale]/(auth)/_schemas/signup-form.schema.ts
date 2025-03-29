import * as yup from "yup";

export const SignUpFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  masterPassword: yup
    .string()
    .required("Master password is required")
    .min(8, "Master password must be at least 8 characters")
    .max(32, "Master password cannot exceed 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Master password must contain at least one lowercase, one uppercase, one number, and one special character",
    ),
  confirmMasterPassword: yup
    .string()
    .required("Confirm master password is required")
    .oneOf([yup.ref("masterPassword")], "Passwords must match"),
  masterPasswordHint: yup
    .string()
    .required("Master password hint is required")
    .min(5, "Password hint must be at least 5 characters"),
  isAgreed: yup
    .boolean()
    .required("You must agree to the terms and conditions."),
});
