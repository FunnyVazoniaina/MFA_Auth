// Mock user database - Replace with real API calls
let mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'password123' }
];

export const authService = {
  // Login user
  async login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => 
          u.username === username && u.password === password
        );
        
        if (user) {
          resolve({ success: true, user });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  },

  // Register new user
  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if username already exists
        if (mockUsers.find(u => u.username === userData.username)) {
          reject(new Error('Username already exists'));
          return;
        }

        const newUser = {
          id: mockUsers.length + 1,
          ...userData
        };
        
        mockUsers.push(newUser);
        resolve({ success: true, user: newUser });
      }, 1000);
    });
  },

  // Get all users (for demo purposes)
  getUsers() {
    return mockUsers;
  }
};