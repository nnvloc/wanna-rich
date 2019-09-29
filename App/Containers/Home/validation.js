import * as Yup from 'yup';

export default Yup.object().shape({
  result: Yup.string()
    // .min(16, 'Should be 12 character')
    // .max(16, 'Should be 12 character')
    .required('Required'),
  extra: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
});
