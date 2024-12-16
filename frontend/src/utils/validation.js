import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/, "Name can only contain letters and underscores.")
    .min(2, "Name must be between 2 and 16 characters.")
    .max(16, "Name must be between 2 and 16 characters."),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email addeess"),
  status: Yup.string().max(64, "Status must be less than 64 characters."),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{6,}$/,
  //   "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&-)."
  // ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email addeess"),
  password: Yup.string().required("Password is required"),
});
