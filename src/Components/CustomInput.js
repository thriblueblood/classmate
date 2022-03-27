import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 2px;
  padding: 6px 6px;
  margin-bottom: 0.5em;
  width : 100%;
//   &:hover {
//     background: ${theme.palette.mode === 'dark' ? null : grey[100]};
//     border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//   }

  &:focus {
    outline: 1px solid ${grey[600]};
  }
`,
);

export default StyledInputElement;