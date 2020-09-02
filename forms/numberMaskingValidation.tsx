import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Label,
  Input,
  SubmitButton,
  FormSection,
  Dropdown,
} from "../../fieldComponents";
import { CountryCode, PhoneSubText } from "./css";
/* @ts-ignore */
import greenCheck from "../../../../images/green-check.svg";
/* @ts-ignore */
import statesList from "../../../../data/states.json";
import { FormData } from "../../../signup";

interface IContactInformation {
  zipcode?: string;
  state?: string;
  city?: string;
  address?: string;
  phoneNumber?: string;
  onSubmit(values?: FormData): void;
}

const validationSchema = Yup.object().shape({
  zipcode: Yup.string()
    .required("Zipcode is a required field")
    .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Please enter a valid zipcode"),
  state: Yup.string().required("State is a required field"),
  city: Yup.string().trim().required("City is a required field"),
  address: Yup.string().trim().required("Address is a required field"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\(\d{3}\) \d{3}\-\d{4}$/,
      "Please enter a valid phone number format: xxx-xxx-xxxx"
    ),
});

const ContactInformationFieldSet = ({
  zipcode,
  state,
  city,
  address,
  phoneNumber,
  onSubmit,
}: IContactInformation): JSX.Element => {
  const newPhoneNum = phoneNumber?.replace("+1", "");

  let remaskedPhoneNum;
  if (newPhoneNum) {
    remaskedPhoneNum = `(${newPhoneNum?.substr(0, 3)}) ${newPhoneNum?.substr(
      3,
      3
    )}-${newPhoneNum?.substr(6, 4)}`;
  }

  return (
    <>
      <p>We need this information for shipping the test kits to your home.</p>
      <Formik
        initialValues={{
          zipcode: zipcode || "",
          state: { value: state, label: state } || "",
          city: city || "",
          address: address || "",
          phoneNumber: remaskedPhoneNum || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const sanitizedPhoneNum = values.phoneNumber
            .replace(/-/g, "")
            .replace("(", "")
            .replace(") ", "");

          const formattedPhone = `+1${sanitizedPhoneNum}`;

          const formattedState = values.state.value;

          const formattedValues = {
            ...values,
            phoneNumber: formattedPhone,
            state: formattedState,
          };

          onSubmit(formattedValues);
        }}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({
          setFieldValue,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => {
          const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const matches = e.target.value
              .replace(/\D/g, "")
              .match(/(\d{0,5})(\d{0,4})/);

            if (matches) {
              e.target.value = !matches[2]
                ? matches[1]
                : `${matches[1]}-${matches[2]}`;
            }
            handleChange(e);
          };

          const handlePhoneNumChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const matches = e.target.value
              .replace(/\D/g, "")
              .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

            if (matches) {
              e.target.value = !matches[2]
                ? matches[1]
                : `(${matches[1]}) ${matches[2]}` +
                  (matches[3] ? `-${matches[3]}` : "");
            }

            handleChange(e);
          };

          return (
            <form onSubmit={handleSubmit} data-testid="contact-info-form">
              <FormSection>
                <Label htmlFor="zipcode">Zip code</Label>
                <Input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  value={values.zipcode}
                  onChange={handleZipChange}
                  onBlur={handleBlur}
                  placeholder="Enter zip code"
                  icon={greenCheck}
                  showIcon={!errors.zipcode && touched.zipcode}
                />
              </FormSection>
              <FormSection>
                <Label htmlFor="state">State</Label>

                <Dropdown
                  onChange={(v: { value: string }) => {
                    setFieldValue("state", v);
                  }}
                  id="state"
                  isMulti={false}
                  options={statesList}
                  selectedValues={values.state}
                  icon={greenCheck}
                  isSearchable
                />
              </FormSection>
              <FormSection>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your city"
                  icon={greenCheck}
                  showIcon={!errors.city && touched.city}
                />
              </FormSection>
              <FormSection>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your street address"
                  showIcon={!errors.address && touched.address}
                  icon={greenCheck}
                />
              </FormSection>
              <FormSection>
                <Label htmlFor="phoneNumber">Mobile Number</Label>
                <CountryCode>+1</CountryCode>

                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handlePhoneNumChange}
                  onBlur={handleBlur}
                  placeholder="Enter your mobile number"
                  showIcon={!errors.phoneNumber && touched.phoneNumber}
                  icon={greenCheck}
                />
                <PhoneSubText>
                  Used only to contact during deliveries
                </PhoneSubText>
              </FormSection>
              <SubmitButton type="submit">Proceed to upload id</SubmitButton>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default ContactInformationFieldSet;
