import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Head from 'next/head';
import '@/styles/globals.css';

// Create a theme instance for Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f9faf6',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Product Sans Regular',
      'Product Sans Bold',
      'Product Sans Italic',
      'Product Sans Bold Italic',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9faf6',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Nested</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
