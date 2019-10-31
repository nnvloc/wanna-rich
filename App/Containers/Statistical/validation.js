import * as Yup from 'yup';

export default Yup.object().shape({
  startDate: Yup.string().required('required'),
  endDate: Yup.string().required('Required'),
});
