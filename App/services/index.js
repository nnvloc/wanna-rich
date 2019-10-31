import axios from 'axios';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';

const APIURL = 'http://dae210dd.ngrok.io';
const api = axios.create({
  baseURL: APIURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const insertResult = async (data) => {
  const { value, extra, date } = data;
  const res = await api.post(`${APIURL}/result/add`, { value, extra, date });
  return res.data || {};
}

export const getData = () => {
  return new Promise((resolve, reject) => api.get(`${APIURL}/data`)
    .then(results => resolve({...results.data}))
    .catch(err => reject(err))
  );
}


export const handleSummary = (data, filter) => {
  if (!filter.startDate || !filter.endDate) {
    return data;
  }

  const startDate = moment(filter.startDate, dateFormat).startOf('d');
  const endDate = moment(filter.endDate, dateFormat).endOf('d');

  const filteredResuls = filterByDate(data, { startDate, endDate });

  return summaryData(filteredResuls).sort((a, b) => (b.valueCount || 0) - (a.valueCount || 0) );
}

const filterByDate = (data, { startDate, endDate }) => {
  return data.reduce((results, item) => (
    moment(item.date, dateFormat).isSameOrAfter(startDate) && moment(item.date, dateFormat).isSameOrBefore(endDate) ? [...results, { ...item }] : [...results]
  ), []);
}

const summaryData = (data) => {
  let result = {};
  data.forEach(item => {
    const extraData = result[item.extra];
    let count = (extraData || {}).extraCount || 0;
    result[item.extra] = { value: item.extra, ...(extraData || {}), extraCount: ++count };

    const valueData = item.value;
    valueData.forEach(v => {
      let valCount = (result[v] || {}).valueCount || 0;
      result[v] = { value: v, ...(result[v] || {}), valueCount: ++valCount };
    });
  });  let results = {};

  return Object.keys(result).map(key => result[key]);
};
