import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ThankYouPage from '../../components/ThankYouPage/ThankYouPage';

const Success = () => {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Get user email from session storage
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (userEmail) {
      setEmail(userEmail);
    } else {
      // If no email information, redirect to homepage
      // This prevents users from directly accessing the success page
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ThankYouPage email={email} />
    </div>
  );
};

export default Success; 