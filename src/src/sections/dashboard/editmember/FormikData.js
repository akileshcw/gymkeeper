import * as Yup from "yup";

const formdata = {
  initialValues: {
    name: "",
    profession: "",
    bloodgroup: "",
    org_name: "",
    gender: "",
    dob: "",
    phonenumber: "",
  },
  validation: Yup.object().shape({
    name: Yup.string().required("required"),
    profession: Yup.string().required("required"),
    bloodgroup: Yup.string().required("required"),
    org_name: Yup.string().required("required"),
    dob: Yup.string().required("required"),
    gender: Yup.string().required("Required"),
    phonenumber: Yup.string()
      .max(10, "Phone Number is 10-digit")
      .min(10, "Phone Number is 10-digit")
      .required("required"),
  }),
};

export default formdata;
