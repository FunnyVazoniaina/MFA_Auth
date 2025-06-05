export const otpService = {
  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // Verify OTP
  async verifyOTP(inputOtp, generatedOtp) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inputOtp === generatedOtp) {
          resolve({ success: true });
        } else {
          reject(new Error('Invalid OTP code'));
        }
      }, 1000);
    });
  },

  // In real app, this would send OTP via SMS/Email
  async sendOTP(user, otp) {
    console.log(`Sending OTP ${otp} to ${user.email}`);
    return Promise.resolve({ success: true });
  }
};