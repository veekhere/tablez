import { Loader } from '@components/loader';
import { STORAGE_KEY, ThemeProvider } from '@components/theme-provider.tsx';
import { AuthProvider } from '@context/auth.context';
import { Router } from '@router/router';
import store from '@store/store';
import { Toaster } from '@ui/sonner.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { FocusContainer } from '@components/focus-container';
import { EditorOverlayProvider } from '@context/editor-overlay.context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider
          defaultTheme='dark'
          storageKey={STORAGE_KEY}
        >
          <EditorOverlayProvider>
            <FocusContainer>
              <Router />
              <Toaster />
              <Loader />
            </FocusContainer>
          </EditorOverlayProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
