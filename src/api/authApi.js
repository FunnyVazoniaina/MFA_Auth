import http from "./http";

export const register = async (data) => {
  const response = await http.post('/auth/register', data);
  return response.data;
}

export const login = async ({ username, password, recaptchaToken }) => {
  
  const res = await http.post('/auth/login', {
    username,
    password,
    recaptchaToken, 
  });

  return { success: true, data: res.data };
};

export const sendOtp = async ({userId, method}) => {
  const response = await http.post('/auth/send-otp', { 
    userId, 
    method,
  });
  return response.data;
}

export const verifyOtp = async (data) => {
  const response = await http.post('/auth/verify-otp', data);
  return response.data;
}

