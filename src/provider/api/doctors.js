import api1 from './clientold';

const getallDoctors = () =>
  api1.post('doctor/get_doctors_by_name', {q: '', is_online: false});
const getDoctorById = info => api1.post('/doctor/get_doctor_by_id', info);

export default {
  getallDoctors,
  getDoctorById,
};
