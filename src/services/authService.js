// Mock user database - Replace with real API calls in production
// Auth Service Object
export const authService = {
  /**
   * Login user with username and password
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Promise} - Promise resolving to user data or error
   */
  async login(username, password) {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const user = mockUsers.find(u => 
          u.username === username && u.password === password
        );
        
        if (user) {
          // Remove password from response for security
          const { password: _, ...userWithoutPassword } = user;
          resolve({ 
            success: true, 
            user: userWithoutPassword,
            message: 'Login successful'
          });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000); // 1 second delay to simulate network request
    });
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise resolving to user data or error
   */
  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if username already exists
        if (mockUsers.find(u => u.username === userData.username)) {
          reject(new Error('Username already exists'));
          return;
        }

        // Check if email already exists
        if (mockUsers.find(u => u.email === userData.email)) {
          reject(new Error('Email already exists'));
          return;
        }

        // Create new user
        const newUser = {
          id: mockUsers.length + 1,
          username: userData.username,
          email: userData.email,
          password: userData.password,
          createdAt: new Date().toISOString()
        };
        
        // Add to mock database
        mockUsers.push(newUser);
        
        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        resolve({ 
          success: true, 
          user: userWithoutPassword,
          message: 'Registration successful'
        });
      }, 1000);
    });
  },

  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Object|null} - User object or null
   */
  getUserById(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  /**
   * Get all users (for demo purposes - remove in production)
   * @returns {Array} - Array of users without passwords
   */
  getAllUsers() {
    return mockUsers.map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },

  /**
   * Update user profile
   * @param {number} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} - Promise resolving to updated user or error
   */
  async updateProfile(userId, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        // Update user data
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...updateData,
          updatedAt: new Date().toISOString()
        };

        // Return updated user without password
        const { password: _, ...userWithoutPassword } = mockUsers[userIndex];
        resolve({
          success: true,
          user: userWithoutPassword,
          message: 'Profile updated successfully'
        });
      }, 500);
    });
  },

  /**
   * Change user password
   * @param {number} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} - Promise resolving to success or error
   */
  async changePassword(userId, currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        
        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        if (user.password !== currentPassword) {
          reject(new Error('Current password is incorrect'));
          return;
        }

        // Update password
        user.password = newPassword;
        user.updatedAt = new Date().toISOString();

        resolve({
          success: true,
          message: 'Password changed successfully'
        });
      }, 500);
    });
  }
};