// src/App.js
import React, { useState, useMemo, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, useMediaQuery, Box } from '@mui/material';
import { getTheme } from './theme/theme';

import SidebarNavigation from './components/SidebarNavigation';
import Home from './pages/Home';
import { sectionTitlesForNav } from './pages/Home';

import './App.css';

export const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

function App() {
  const prefersDarkModeSys = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState(() => {
    const storedPreference = localStorage.getItem('themeMode');
    if (storedPreference) {
      return storedPreference;
    }
    return prefersDarkModeSys ? 'dark' : 'light';
  });

  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  const themeModeContextValue = useMemo(
    () => ({
      toggleThemeMode: () => {
        setThemeMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline applies box-sizing: border-box globally */}
        <Router>
          {/* The outer Box for the entire app. flex direction column. */}
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <SidebarNavigation sectionTitles={sectionTitlesForNav} />
            {/* Main content area that grows. Critically, add overflowX: 'hidden' here too. */}
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                overflowX: 'hidden', // Prevent Home component or its children from causing horizontal scroll
              }}
            >
              <Home />
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;