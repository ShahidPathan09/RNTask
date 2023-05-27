import * as Yup from 'yup';

export const FormValidation = Yup.object().shape({
  fName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  dob: Yup.string().required('Required'),
});
