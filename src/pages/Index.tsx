
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/Login/LoginForm';
import Dashboard from './Dashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <LoginForm />;
};

export default Index;
