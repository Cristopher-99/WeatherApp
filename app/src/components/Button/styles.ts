import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const ButtonStyled = styled(Button)(({ theme }) => ({
  height: theme.buttons?.standard?.height,
  width: theme.buttons?.standard?.width,
}));
