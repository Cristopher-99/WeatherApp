import { ButtonStyled } from './styles';
import { ButtonProps } from '@mui/material/Button';

export function Button( props: ButtonProps) {
  const {
    variant = "contained",
    onClick = () => {},
    title = 'Generic'
  } = props;
  return (
    <ButtonStyled variant={variant} onClick={onClick}>
      {props.children}
    </ButtonStyled>
  )
}
