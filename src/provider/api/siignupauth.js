import {create} from 'apisauce';

const api1 = create({
  // baseURL: 'https://api.moderncare.org/',
  baseURL: 'https://demo.ucheed.com/matc/wp-json/ucheed-json/v1',
  timeout: 10000,

});
// const api1 = create({
//   // baseURL: 'https://api.moderncare.org/',
//   baseURL: 'https://host.ucheed.com/matc/api/',
// });
export default api1;
