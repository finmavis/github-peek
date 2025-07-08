import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import App from './app.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename='/github-peek'>
        <Theme
          accentColor='blue'
          grayColor='gray'
          scaling='100%'
          radius='medium'
        >
          <App />
        </Theme>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
