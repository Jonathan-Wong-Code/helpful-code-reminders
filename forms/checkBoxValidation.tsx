const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Enter your last name")
    .matches(firstNameMatch, "Enter the correct first name"),

  lastName: Yup.string()
    .required("Enter your first name")
    .matches(lastNameMatch, "Enter the correct last name"),

  termsConsent: Yup.boolean().oneOf(
    [true],
    "Must agree to the terms and conditions"
  ),
  infoConsent: Yup.boolean().oneOf(
    [true],
    "Must consent to the collection of personal and medical test data."
  ),
});
