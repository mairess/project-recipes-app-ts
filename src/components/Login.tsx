import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { email, password } = loginData;

  const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = target.value;
    setLoginData({ ...loginData, email: newEmail });
    validateForm(newEmail, password);
  };

  const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = target.value;
    setLoginData({ ...loginData, password: newPassword });
    validateForm(email, newPassword);
  };

  const validateForm = (newEmail: string, newPassword: string) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    const isPasswordValid = newPassword.length > 6;
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
      navigate('/meals');
    }
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        name=""
        id=""
        onChange={ handleEmailChange }
      />
      <input
        data-testid="password-input"
        type="password"
        name=""
        id=""
        onChange={ handlePasswordChange }
      />
      <button
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !isFormValid }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
