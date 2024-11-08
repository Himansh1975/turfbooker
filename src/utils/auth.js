// Simple authentication simulation using localStorage
export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

export const signup = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    return false; // User already exists
  }
  // Set role as 'user' by default
  const newUser = { 
    id: users.length + 1, 
    name, 
    email, 
    password,
    role: 'user' // Add role field
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return true;
};

// Add this function to create initial admin
export const createInitialAdmin = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (!users.some(u => u.role === 'admin')) {
    const admin = {
      id: 'admin1',
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'admin123', // In real app, use hashed password
      role: 'admin'
    };
    users.push(admin);
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const isAdmin = () => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'admin';
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('currentUser');
};
