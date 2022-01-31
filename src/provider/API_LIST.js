'use-strict';
export const HOST = 'https://api.moderncare.org/';

export const DEVICE = HOST + 'device/create';
export const SIGNUP = HOST + 'user/signup';
export const SIGNOUT = HOST + 'user/signout';
export const LOGIN = HOST + 'user/login';
export const PROFILE = HOST + 'user/get_profile';
export const UPDATE_PROFILE = HOST + 'user/update-profile';
export const CHANGE_PASSWORD = HOST + 'user/change_password';
export const REQUEST_SMS_CODE = HOST + 'user/request_sms_code';
export const RESET_PASSWORD = HOST + 'user/reset_password';
export const VERIFY_USER = HOST + 'user/verify';

export const SETTINGS_SLIDER = HOST + 'settings/get_slider';
export const SETTINGS_PRIVACY = HOST + 'settings/get_settings';
export const BLOG_CATEGORY = HOST + 'blog/get_all_blog_category';
export const BLOG_POST = HOST + 'blog/get_blog_post';
export const BLOG_POSTS = HOST + 'blog/get_all_blog_posts';

export const DOCTOR_SPECIALTIES = HOST + 'doctor/get_doctor_specialities';
export const DOCTOR_BY_NAME = HOST + 'doctor/get_doctors_by_name';
export const DOCTOR_BY_ID = HOST + 'doctor/get_doctor_by_id';
export const DOCTOR_BY_SPECIALTY = HOST + 'doctor/get_doctors_by_speciality';
export const DOCTOR_BY_CLINIC = HOST + 'doctor/get_doctor_by_clinic_id';
export const DOCTOR_SEND_ENQUIRY = HOST + 'doctor/send_doctor_enquiry';

export const APPOINTMENT_BOOK = HOST + 'appointment/book_user_appointment';
export const APPOINTMENT_CANCEL = HOST + 'appointment/cancel_user_appointment';
export const APPOINTMENT_CLINIC_TIMING =
  HOST + 'appointment/get_doctor_clinic_timing';
export const APPOINTMENT_CLINIC_AVAILABLE_TIMING =
  HOST + 'appointment/get_doctor_clinic_timing_available';
export const APPOINTMENT_LIST = HOST + 'appointment/get_user_appointments';
export const APPOINTMENT_GET_ACCESS_TOKEN = HOST + 'appointment/access_token';

// chats
export const APPOINTMENT_CHAT_MESSAGES = HOST + 'chat/get_messages';
export const APPOINTMENT_CHAT_POST_MESSAGE = HOST + 'chat/post_message';
export const APPOINTMENT_CHAT_POST_FILE = HOST + 'chat/post_file';

export const PRIVACY_POLICY_URL = 'https://moderncare.org/privacy-policy/';
export const TERMS_CONDITIONS_URL = 'https://moderncare.org/terms-conditions/';
