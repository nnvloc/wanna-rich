import axios from 'axios';

const APIURL = 'http://a351fb59.ngrok.io';

export const insertResult = async (result) => {
  const newResult = await axios.post(`${APIURL}/result/add`);
  return newResult;
}

export const getData = () => {
  return new Promise((resolve, reject) => axios.get(`${APIURL}/data`)
    .then(results => resolve({...results.data}))
    .catch(err => reject(err))
  );
}
