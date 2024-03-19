import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useCustomDispatch } from '../../hooks/redux';
import { setUserSession } from '../../redux/slices/login';

import { Alert, Button } from '@mui/material';
import { InputStyled } from './styles';

import logo from '../../assets/icons/hand.webp';

const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Ingres su direccion de email')
    .required('Email es requerido'),
  password: yup
    .string()
    .min(8, 'Debe de poseer como minimo 8 caracteres')
    .required('Contraseña es requerida')
});

export const LoginAdmin = () => {
  const [submitDisable, setSubmitDisable] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  interface UserI {
    email: string;
    password: string;
  }

  interface UserResponseI {
    email: string;
    password: string;
    accessToken: string;
  }

  const getUser = async (data: UserI): Promise<UserResponseI | null> => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };

      const response = await fetch(`${BACKEND_API}/auth`, requestOptions);

      const parsed = await response.json();
      //Se agrega como prueba
      return { ...data, ...{ accessToken: '1233445' } } as UserResponseI;
      if (response.status !== 200) {
        setLoginState(true);
        return null;
      } else {
        return { ...data, ...{ accessToken: parsed.accessToken } } as UserResponseI;
      }
    } catch (error) {
      return { ...data, ...{ accessToken: '1233445' } } as UserResponseI;
      setLoginState(true);
      console.error(error);
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        setSubmitDisable(true);

        const userData = await getUser(values);

        if (userData) {
          const user = {
            name: userData?.email || '',
            isAuthenticated: true,
            accessToken: userData.accessToken
          };
          dispatch(setUserSession(user));
          navigate(`${BASE_URL}/dashboard`, { replace: true });
        }
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setSubmitDisable(false);
      }
    }
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh'
        }}>
        <img src={logo} width={150} height={150} alt={'logo'} />
        <h2>Iniciar Session aaaaaaaaaa</h2>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            gap: '2rem'
          }}
          onSubmit={formik.handleSubmit}>
          <InputStyled
            fullWidth
            id='outlined-textarea email'
            placeholder='Usuario'
            type='text'
            name='email'
            label='Usuario'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <InputStyled
            fullWidth
            id='outlined-textarea password'
            placeholder='Contraseña'
            name='password'
            label='Contraseña'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            style={{ borderRadius: '9px', height: '55px' }}
            disabled={submitDisable}
            color='primary'
            variant='contained'
            fullWidth
            type='submit'>
            Ingresar
          </Button>
        </form>
        {loginState && (
          <Alert severity='error'>Error al intentar iniciar sesion</Alert>
        )}
      </div>
    </div>
  );
};
