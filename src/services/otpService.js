// OTP Service for handling One-Time Password operations
export const otpService = {
  /**
   * Generate a 6-digit OTP
   * @returns {string} - 6-digit OTP string
   */
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  /**
   * Generate a 4-digit OTP (alternative for SMS)
   * @returns {string} - 4-digit OTP string
   */
  generateShortOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  /**
   * Verify OTP against the generated one
   * @param {string} inputOtp - OTP entered by user
   * @param {string} generatedOtp - Original OTP that was generated
   * @returns {Promise} - Promise resolving to verification result
   */
  async verifyOTP(inputOtp, generatedOtp) {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        // Clean inputs (remove spaces, convert to string)
        const cleanInput = inputOtp.toString().replace(/\s/g, '');
        const cleanGenerated = generatedOtp.toString().replace(/\s/g, '');

        if (cleanInput === cleanGenerated) {
          resolve({ 
            success: true,
            message: 'OTP verification successful',
            timestamp: new Date().toISOString()
          });
        } else {
          reject(new Error('Invalid OTP code. Please try again.'));
        }
      }, 1000);
    });
  },

  /**
   * Send OTP via email (mock implementation)
   * In production, integrate with email service like SendGrid, AWS SES, etc.
   * @param {Object} user - User object with email
   * @param {string} otp - OTP to send
   * @returns {Promise} - Promise resolving to send result
   */
  async sendOTPByEmail(user, otp) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock email sending
        console.log(`📧 Sending OTP to ${user.email}: ${otp}`);
        
        // In production, you would integrate with an email service:
        // const emailResult = await emailService.send({
        //   to: user.email,
        //   subject: 'Your Verification Code',
        //   template: 'otp-email',
        //   data: { otp, username: user.username }
        // });

        resolve({
          success: true,
          message: `OTP sent to ${user.email}`,
          method: 'email',
          timestamp: new Date().toISOString()
        });
      }, 500);
    });
  },

  /**
   * Send OTP via SMS (mock implementation)
   * In production, integrate with SMS service like Twilio, AWS SNS, etc.
   * @param {string} phoneNumber - User's phone number
   * @param {string} otp - OTP to send
   * @returns {Promise} - Promise resolving to send result
   */
  async sendOTPBySMS(phoneNumber, otp) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock SMS sending
        console.log(`📱 Sending OTP to ${phoneNumber}: ${otp}`);
        
        // In production, you would integrate with an SMS service:
        // const smsResult = await smsService.send({
        //   to: phoneNumber,
        //   message: `Your verification code is: ${otp}. Valid for 10 minutes.`
        // });

        resolve({
          success: true,
          message: `OTP sent to ${phoneNumber}`,
          method: 'sms',
          timestamp: new Date().toISOString()
        });
      }, 500);
    });
  },

  /**
   * Check if OTP has expired
   * @param {string} timestamp - When OTP was generated
   * @param {number} expiryMinutes - Expiry time in minutes (default: 10)
   * @returns {boolean} - True if expired, false if still valid
   */
  isOTPExpired(timestamp, expiryMinutes = 10) {
    const now = new Date();
    const otpTime = new Date(timestamp);
    const expiryTime = new Date(otpTime.getTime() + (expiryMinutes * 60 * 1000));
    
    return now > expiryTime;
  },

  /**
   * Get remaining time for OTP validity
   * @param {string} timestamp - When OTP was generated
   * @param {number} expiryMinutes - Expiry time in minutes (default: 10)
   * @returns {number} - Remaining seconds (0 if expired)
   */
  getRemainingTime(timestamp, expiryMinutes = 10) {
    const now = new Date();
    const otpTime = new Date(timestamp);
    const expiryTime = new Date(otpTime.getTime() + (expiryMinutes * 60 * 1000));
    
    const remainingMs = expiryTime.getTime() - now.getTime();
    const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    
    return remainingSeconds;
  },

  /**
   * Format remaining time as MM:SS
   * @param {number} seconds - Remaining seconds
   * @returns {string} - Formatted time string
   */
  formatRemainingTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  },

  /**
   * Generate OTP with metadata
   * @param {Object} options - Options for OTP generation
   * @returns {Object} - OTP with metadata
   */
  generateOTPWithMetadata(options = {}) {
    const {
      length = 6,
      type = 'numeric', // 'numeric', 'alphanumeric'
      expiryMinutes = 10
    } = options;

    let otp;
    
    if (type === 'alphanumeric') {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      otp = '';
      for (let i = 0; i < length; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } else {
      // Numeric OTP
      const min = Math.pow(10, length - 1);
      const max = Math.pow(10, length) - 1;
      otp = Math.floor(Math.random() * (max - min + 1) + min).toString();
    }

    return {
      code: otp,
      timestamp: new Date().toISOString(),
      expiryMinutes,
      type,
      length
    };
  }
};