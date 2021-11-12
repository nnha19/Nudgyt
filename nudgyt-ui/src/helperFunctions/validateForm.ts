export const validateForm = (
  e: React.ChangeEvent<HTMLInputElement>,
  validRules: { type: string },
  password?: string
) => {
  let {
    target: { value },
  } = e;
  let error;
  switch (validRules.type) {
    case "REQUIRED":
      error =
        value === "" || value === null || value === undefined
          ? "This field is required"
          : null;
      break;
    case "EMAIL":
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      error = re.test(String(value).toLowerCase()) ? null : "Invalid email";
      break;
    case "CONFIRM_PASSWORD":
      error = value === password ? null : "Passwords don't match";
      break;
  }

  return error;
};
