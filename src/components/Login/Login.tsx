import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlexGrid from '../layout/Grid';
import { IconLoginPassword, IconLoginUser, IconLogo } from '../../assets/svg';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import styles from './Login.module.scss';

// Создаем интерфейс для пропсов компонента Login
interface LoginProps {
  onAuthenticate: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthenticate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Стейт для ошибок
  const navigate = useNavigate();

  const randomCredentials = {
    username: 'Admin',
    password: '!qwe2321!',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === randomCredentials.username &&
      password === randomCredentials.password
    ) {
      onAuthenticate(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <FlexGrid className={styles.Login} direction="column">
      <IconLogo />
      <FlexGrid className={styles.LoginContainer} direction="column">
        <Typography
          color="var(--color-text-primary)"
          fontSize={'24px'}
          fontWeight={600}
        >
          Вход в систему
        </Typography>
        <Typography
          color="var(--color-text-second)"
          fontSize={'14px'}
          fontWeight={600}
        >
          Заполните поля для входа
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: '12px' }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <FlexGrid marginTop="24px" gap={16} direction="column">
            <TextField
              placeholder="Логин"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconLoginUser />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Пароль"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconLoginPassword />
                  </InputAdornment>
                ),
              }}
            />
          </FlexGrid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Войти
          </Button>
        </form>
      </FlexGrid>
    </FlexGrid>
  );
};

export default Login;
