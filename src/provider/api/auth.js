import api from './client';
import api1 from './siignupauth';
const login = info => api.post('/token', info);
const register = info => api1.post('/patients-sign-up', info);
const signup = info => api1.put('/patients/self', info);
export default {
  login,
  register,
  signup
};
