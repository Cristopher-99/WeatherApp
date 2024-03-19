import { Switch, Typography } from '@mui/material';

import { useCustomSelector, useCustomDispatch } from '../../hooks/redux';
import { setThemeMode } from '../../redux/slices/settings';
import { setLogOut } from '../../redux/slices/login';

import {
  AppBarStyled,
  AppBarContainerStyled,
  BodyContainerStyled
} from './styles';

import { Button as Custom } from '../../components/Button';

export const Home: React.FC = () => {
  const { themeMode }  = useCustomSelector(({settings}) => (settings));
    
  
  const dispatch = useCustomDispatch();

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <AppBarStyled>
        <AppBarContainerStyled>
          <Typography variant="h6">
            Template - VITE - SWC - TS - REACT - REDUX TOOLKIT - MATERIAL UI
          </Typography>
          <Switch onChange={handleChangeTheme} />
        </AppBarContainerStyled>
      </AppBarStyled>
      <BodyContainerStyled>
        <Custom variant='contained' onClick={()=> alert('Funciona')}>Test</Custom>
        <Custom variant='contained' onClick={()=> dispatch(setLogOut())}>LogOut</Custom>
      </BodyContainerStyled>
    </div>
  );
};
