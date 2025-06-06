// Validation utilities for form inputs and data validation

export const validation = {
  /**
   * Validate email format using regex
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email?.trim());
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result with strength info
   */
  validatePassword(password) {
    if (!password) {
      return { 
        isValid: false, 
        strength: 'empty',
        message: 'Password is required',
        score: 0
      };
    }

    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(checks).filter(Boolean).length;
    
    let strength, message;
    
    if (score < 2) {
      strength = 'weak';
      message = 'Password is too weak';
    } else if (score < 4) {
      strength = 'medium';
      message = 'Password strength is medium';
    } else {
      strength = 'strong';
      message = 'Password is strong';
    }

    return {
      isValid: checks.length && score >= 3,
      strength,
      message,
      score,
      checks
    };
  },

  /**
   * Basic password validation (minimum requirements)
   * @param {string} password - Password to validate
   * @returns {boolean} - True if password meets minimum requirements
   */
  isValidPassword(password) {
    return password && password.length >= 8;
  },

  /**
   * Validate username format and requirements
   * @param {string} username - Username to validate
   * @returns {Object} - Validation result
   */
  validateUsername(username) {
    if (!username) {
      return {
        isValid: false,
        message: 'Username is required'
      };
    }

    const trimmed = username.trim();
    
    if (trimmed.length < 3) {
      return {
        isValid: false,
        message: 'Username must be at least 3 characters long'
      };
    }

    if (trimmed.length > 20) {
      return {
        isValid: false,
        message: 'Username must be less than 20 characters'
      };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return {
        isValid: false,
        message: 'Username can only contain letters, numbers, and underscores'
      };
    }

    if (/^[0-9]/.test(trimmed)) {
      return {
        isValid: false,
        message: 'Username cannot start with a number'
      };
    }

    return {
      isValid: true,
      message: 'Username is valid'
    };
  },

  /**
   * Simple username validation (for backward compatibility)
   * @param {string} username - Username to validate
   * @returns {boolean} - True if valid
   */
  isValidUsername(username) {
    return this.validateUsername(username).isValid;
  },

  /**
   * Validate OTP format
   * @param {string} otp - OTP to validate
   * @param {number} length - Expected OTP length (default: 6)
   * @returns {boolean} - True if valid OTP format
   */
  isValidOTP(otp, length = 6) {
    if (!otp) return false;
    const cleanOtp = otp.toString().replace(/\s/g, '');
    const regex = new RegExp(`^\\d{${length}}$`);
    return regex.test(cleanOtp);
  },

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - True if valid phone format
   */
  isValidPhone(phone) {
    if (!phone) return false;
    // Basic phone validation - adjust regex based on your requirements
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  },

  /**
   * Validate that two passwords match
   * @param {string} password - Original password
   * @param {string} confirmPassword - Confirmation password
   * @returns {boolean} - True if passwords match
   */
  passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  },

  /**
   * Validate required field
   * @param {any} value - Value to check
   * @param {string} fieldName - Name of the field for error message
   * @returns {Object} - Validation result
   */
  validateRequired(value, fieldName = 'Field') {
    const isEmpty = value === null || 
                   value === undefined || 
                   (typeof value === 'string' && value.trim() === '') ||
                   (Array.isArray(value) && value.length === 0);

    return {
      isValid: !isEmpty,
      message: isEmpty ? `${fieldName} is required` : `${fieldName} is valid`
    };
  },

  /**
   * Validate minimum length
   * @param {string} value - Value to check
   * @param {number} minLength - Minimum required length
   * @param {string} fieldName - Name of the field for error message
   * @returns {Object} - Validation result
   */
  validateMinLength(value, minLength, fieldName = 'Field') {
    const length = value ? value.toString().length : 0;
    const isValid = length >= minLength;

    return {
      isValid,
      message: isValid 
        ? `${fieldName} meets minimum length requirement`
        : `${fieldName} must be at least ${minLength} characters long`
    };
  },

  /**
   * Validate maximum length
   * @param {string} value - Value to check
   * @param {number} maxLength - Maximum allowed length
   * @param {string} fieldName - Name of the field for error message
   * @returns {Object} - Validation result
   */
  validateMaxLength(value, maxLength, fieldName = 'Field') {
    const length = value ? value.toString().length : 0;
    const isValid = length <= maxLength;

    return {
      isValid,
      message: isValid 
        ? `${fieldName} meets maximum length requirement`
        : `${fieldName} must be no more than ${maxLength} characters long`
    };
  },

  /**
   * Comprehensive form validation
   * @param {Object} formData - Form data to validate
   * @param {Object} rules - Validation rules
   * @returns {Object} - Validation results
   */
  validateForm(formData, rules) {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const fieldRules = rules[fieldName];
      const fieldValue = formData[fieldName];
      
      fieldRules.forEach(rule => {
        if (errors[fieldName]) return; // Skip if already has error

        let result;
        
        switch (rule.type) {
          case 'required':
            result = this.validateRequired(fieldValue, fieldName);
            break;
          case 'email':
            if (fieldValue) { // Only validate email if field has value
              result = {
                isValid: this.isValidEmail(fieldValue),
                message: this.isValidEmail(fieldValue) ? 'Valid email' : 'Invalid email format'
              };
            }
            break;
          case 'password':
            if (fieldValue) {
              result = this.validatePassword(fieldValue);
            }
            break;
          case 'username':
            if (fieldValue) {
              result = this.validateUsername(fieldValue);
            }
            break;
          case 'minLength':
            result = this.validateMinLength(fieldValue, rule.value, fieldName);
            break;
          case 'maxLength':
            result = this.validateMaxLength(fieldValue, rule.value, fieldName);
            break;
          case 'match':
            result = {
              isValid: fieldValue === formData[rule.field],
              message: fieldValue === formData[rule.field] 
                ? 'Fields match' 
                : `${fieldName} must match ${rule.field}`
            };
            break;
          default:
            result = { isValid: true, message: 'No validation applied' };
        }

        if (!result.isValid) {
          errors[fieldName] = result.message;
          isValid = false;
        }
      });
    });

    return {
      isValid,
      errors
    };
  }
};