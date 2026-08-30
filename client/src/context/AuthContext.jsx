import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const MOCK_USERS = {
  FARMER: {
    id: "u_farmer_1",
    name: "Ramesh Kumar",
    phone: "9876543210",
    role: "FARMER",
    village: "Khedi Kalan",
    district: "Faridabad",
    state: "Haryana",
    bankAccount: "XXXX XXXX 4812",
    aadhaarLast4: "8912"
  },
  OFFICER: {
    id: "u_officer_1",
    name: "Vikram Singh",
    phone: "9876543211",
    role: "OFFICER",
    centreName: "Mandi Bhawan, Sector 12"
  },
  ADMIN: {
    id: "u_admin_1",
    name: "Ananya Sharma",
    phone: "9876543212",
    role: "ADMIN"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agrocure_user');
    return saved ? JSON.parse(saved) : MOCK_USERS.FARMER;
  });

  const [token, setToken] = useState(() => localStorage.getItem('agrocure_token') || 'demo_jwt_token');

  const loginWithPhone = async (phone, otp = '123456', role = 'FARMER') => {
    try {
      const res = await axios.post('/api/auth/verify-otp', { phone, otp, role });
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('agrocure_user', JSON.stringify(res.data.user));
        localStorage.setItem('agrocure_token', res.data.token);
        return { success: true };
      }
    } catch (err) {
      // Fallback for instant client-only demo
      const selectedUser = MOCK_USERS[role] || MOCK_USERS.FARMER;
      setUser(selectedUser);
      localStorage.setItem('agrocure_user', JSON.stringify(selectedUser));
      return { success: true };
    }
  };

  const switchRole = (newRole) => {
    const targetUser = MOCK_USERS[newRole] || MOCK_USERS.FARMER;
    setUser(targetUser);
    localStorage.setItem('agrocure_user', JSON.stringify(targetUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agrocure_user');
    localStorage.removeItem('agrocure_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginWithPhone, switchRole, logout, role: user?.role || 'FARMER' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
