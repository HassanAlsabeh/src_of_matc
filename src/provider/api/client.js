import {create} from 'apisauce';

const api = create({
  // baseURL: 'https://api.moderncare.org/',
  baseURL: 'https://demo.ucheed.com/matc/wp-json/jwt-auth/v1',
});
// const api1 = create({
//   // baseURL: 'https://api.moderncare.org/',
//   baseURL: 'https://host.ucheed.com/matc/api/',
// });
export default api;
