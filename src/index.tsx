import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import './app/styles/_reset.scss'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
       <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
