import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  masterPassword: z.string().nonempty("Master password is required"),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
