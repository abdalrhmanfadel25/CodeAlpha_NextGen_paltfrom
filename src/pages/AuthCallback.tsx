import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Optionally, fetch user profile here and store in context/state
      navigate('/');
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default AuthCallback;
