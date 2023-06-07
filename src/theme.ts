import { grey, teal } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[800],
      contrastText: grey[50],
    },
  },
});

export default responsiveFontSizes(theme);
