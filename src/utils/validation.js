export const validation = {
  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  isValidPassword(password) {
    return password.length >= 8;
  },

  // Validate username
  isValidUsername(username) {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  },

  // Validate OTP
  isValidOTP(otp) {
    return /^\d{6}$/.test(otp);
  }
};