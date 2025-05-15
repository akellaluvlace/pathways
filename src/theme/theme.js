// src/theme/theme.js
// (Content as provided in the prompt, confirmed to be suitable for modern UI.
// No specific changes were required here beyond adhering to its definitions.)
import { createTheme, alpha } from '@mui/material/styles';
import { blue, grey, cyan, deepPurple, pink, orange } from '@mui/material/colors';

// --- Font Setup ---
const FONT_FAMILY_PRIMARY = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'; // Modern font stack

// --- Common Theme Settings ---
const commonSettings = {
  typography: {
    fontFamily: FONT_FAMILY_PRIMARY,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600, // Slightly bolder medium weight
    fontWeightBold: 700,

    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.25, textAlign: 'center', marginBottom: '2rem' }, // Adjusted for section titles
    h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '1.5rem' },
    h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.35, marginBottom: '1rem' },
    h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.45 },
    subtitle1: { fontSize: '1rem', fontWeight: 400 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.65 }, // Slightly increased line height
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', fontWeight: 400 },
    overline: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },

    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 4, // Slightly more rounded for modern feel
  },
  shadows: [
    "none", "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)", "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)", "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)", "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)", "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)", "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)", "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)", "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)", "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)", "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)", "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)", "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)", "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)", "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)", "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)", "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)", "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)", "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)", "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)", "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)", "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)", "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)", "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)", "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195, },
    easing: { easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)', easeIn: 'cubic-bezier(0.4, 0, 1, 1)', sharp: 'cubic-bezier(0.4, 0, 0.6, 1)', },
  },
};

const lightPalette = {
  mode: 'light',
  primary: { main: cyan[800], light: cyan[600], dark: cyan[900], contrastText: '#ffffff', },
  secondary: { main: deepPurple[600], light: deepPurple[400], dark: deepPurple[800], contrastText: '#ffffff', },
  background: { default: grey[50], paper: '#ffffff', }, // Slightly off-white background
  text: { primary: grey[900], secondary: grey[700], disabled: grey[500], },
  divider: grey[300],
  action: { active: grey[600], hover: alpha(grey[500], 0.08), selected: alpha(grey[500], 0.16), disabled: alpha(grey[500], 0.26), disabledBackground: alpha(grey[500], 0.12), focus: alpha(grey[500], 0.12), },
  success: { main: '#2e7d32', light: '#4caf50', dark: '#1b5e20', contrastText: '#ffffff', },
  error: { main: '#d32f2f', light: '#ef5350', dark: '#c62828', contrastText: '#ffffff', },
  warning: { main: orange[700], light: orange[500], dark: orange[900], contrastText: '#ffffff', },
  info: { main: blue[700], light: blue[500], dark: blue[900], contrastText: '#ffffff', },
};

const darkPalette = {
  mode: 'dark',
  primary: { main: cyan[500], light: cyan[300], dark: cyan[700], contrastText: 'rgba(0, 0, 0, 0.87)', },
  secondary: { main: pink[300], light: pink[200], dark: pink[400], contrastText: 'rgba(0, 0, 0, 0.87)', },
  background: { default: '#121212', paper: grey[900], }, // Standard dark theme background
  text: { primary: grey[50], secondary: grey[400], disabled: grey[600], },
  divider: alpha(grey[50], 0.12),
  action: { active: grey[100], hover: alpha(grey[50], 0.08), selected: alpha(grey[50], 0.16), disabled: alpha(grey[50], 0.3), disabledBackground: alpha(grey[50], 0.12), focus: alpha(grey[50], 0.12), },
  success: { main: '#66bb6a', light: '#81c784', dark: '#388e3c', contrastText: 'rgba(0, 0, 0, 0.87)', },
  error: { main: '#f44336', light: '#e57373', dark: '#d32f2f', contrastText: '#ffffff', },
  warning: { main: orange[400], light: orange[300], dark: orange[700], contrastText: 'rgba(0, 0, 0, 0.87)', },
  info: { main: blue[400], light: blue[300], dark: blue[700], contrastText: 'rgba(0, 0, 0, 0.87)', },
};

const getTheme = (mode) => {
  const currentPalette = mode === 'light' ? lightPalette : darkPalette;
  return createTheme({
    ...commonSettings,
    palette: currentPalette,
    components: {
       MuiCssBaseline: {
         styleOverrides: (themeParam) => ({
           body: {
             backgroundColor: themeParam.palette.background.default,
             backgroundAttachment: 'fixed',
             minHeight: '100vh',
             WebkitFontSmoothing: 'antialiased',
             MozOsxFontSmoothing: 'grayscale',
           },
           html: {
             scrollBehavior: 'smooth',
           },
           '.rich-text-content img': { maxWidth: '100%', height: 'auto', borderRadius: themeParam.shape.borderRadius, marginTop: themeParam.spacing(2), marginBottom: themeParam.spacing(2), display: 'block', boxShadow: themeParam.shadows[2], },
           '.rich-text-content h1, .rich-text-content h2, .rich-text-content h3, .rich-text-content h4, .rich-text-content h5, .rich-text-content h6': { marginTop: themeParam.spacing(4), marginBottom: themeParam.spacing(1.5), color: themeParam.palette.text.primary, },
           '.rich-text-content p': { marginBottom: themeParam.spacing(2), color: themeParam.palette.text.primary, },
           '.rich-text-content ul, .rich-text-content ol': { marginBottom: themeParam.spacing(2), paddingLeft: themeParam.spacing(3), color: themeParam.palette.text.secondary, },
           '.rich-text-content li': { marginBottom: themeParam.spacing(1) },
           '.rich-text-content strong': { fontWeight: themeParam.typography.fontWeightBold, color: 'inherit' },
           '.rich-text-content em': { fontStyle: 'italic', color: 'inherit' },
           '.rich-text-content a': { color: themeParam.palette.primary.main, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px', '&:hover': { color: themeParam.palette.primary.dark, textDecorationThickness: '2px' } },
           '.rich-text-content blockquote': { margin: themeParam.spacing(2, 0, 2, 2), padding: themeParam.spacing(1, 2), borderLeft: `4px solid ${themeParam.palette.divider}`, color: themeParam.palette.text.secondary, fontStyle: 'italic', },
           '.rich-text-content code': { backgroundColor: alpha(themeParam.palette.text.primary, 0.08), padding: '0.1em 0.3em', borderRadius: themeParam.shape.borderRadius * 0.5, fontFamily: 'monospace', fontSize: '0.9em', },
           '.rich-text-content pre': { backgroundColor: alpha(themeParam.palette.text.primary, 0.05), padding: themeParam.spacing(2), borderRadius: themeParam.shape.borderRadius, overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.9em', lineHeight: 1.4, marginBottom: themeParam.spacing(2), }
         }),
       },
       MuiCard: { 
          defaultProps: { elevation: 0, },
          styleOverrides: {
              root: ({ theme }) => ({
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.divider}`, 
                  boxShadow: theme.shadows[0], // MuiCard often starts with no shadow by default
                  transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], { duration: theme.transitions.duration.shorter, }),
                  overflow: 'visible', 
                   '&:hover': {
                       borderColor: theme.palette.primary.light,
                       boxShadow: theme.shadows[4],
                       transform: 'translateY(-2px)', // Added subtle lift
                   }
              }),
         },
       },
       MuiPaper: {
           defaultProps: { elevation: 0, },
           styleOverrides: {
              root: ({ theme }) => ({ // Default Paper style
                   backgroundColor: theme.palette.background.paper,
                   borderRadius: theme.shape.borderRadius,
                   border: `1px solid ${theme.palette.divider}`, // Consistent border
                   boxShadow: theme.shadows[1], // Default Paper often has a slight shadow
                   transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], { duration: theme.transitions.duration.shorter, }),
                   '&:hover': {
                       borderColor: theme.palette.primary.light, // Standardized hover border color
                       boxShadow: theme.shadows[4], // Standard hover shadow
                       transform: 'translateY(-2px)', // Added subtle lift
                   },
              }),
              outlined: ({ theme }) => ({ // Outlined Paper variant style
                backgroundColor: theme.palette.background.paper, // Ensure background is opaque by default
                borderRadius: theme.shape.borderRadius, // Ensure theme border radius is applied
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 'none', // Outlined usually starts with no shadow
                transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], { duration: theme.transitions.duration.shorter, }), // Ensure transition applies
                 '&:hover': {
                    borderColor: theme.palette.primary.light, // Standardized hover border color
                    boxShadow: theme.shadows[3], // Slightly less shadow for outlined, or use theme.shadows[4] for exact match
                    transform: 'translateY(-2px)', // Added subtle lift
                 }
              }),
           }
       },
       MuiButton: {
            variants: [ { props: { variant: 'contained' }, style: ({ theme }) => ({ boxShadow: theme.shadows[2], padding: theme.spacing(0.75, 2.5), '&:hover': { boxShadow: theme.shadows[4], transform: 'translateY(-1px)' }, }), }, { props: { variant: 'outlined' }, style: ({ theme }) => ({ padding: theme.spacing(0.75, 2.5), borderWidth: '1px', '&:hover': { borderWidth: '1px', backgroundColor: theme.palette.action.hover, }, }), }, { props: { variant: 'text' }, style: ({ theme }) => ({ padding: theme.spacing(0.75, 2), '&:hover': { backgroundColor: theme.palette.action.hover, }, }), }, ],
            styleOverrides: {
                root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 1, transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color', 'transform'], { duration: theme.transitions.duration.short, easing: theme.transitions.easing.easeOut, }), '&.Mui-disabled': { boxShadow: 'none', } }),
                sizeSmall: ({ theme }) => ({ padding: theme.spacing(0.5, 1.5) }),
                sizeLarge: ({ theme }) => ({ padding: theme.spacing(1, 3) }),
            }
       },
       MuiIconButton: { styleOverrides: { root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius, transition: theme.transitions.create(['background-color', 'transform', 'color'], { duration: theme.transitions.duration.short, }), '&:hover': { backgroundColor: theme.palette.action.hover, } }) } },
       MuiModal: { styleOverrides: { root: ({ theme }) => ({}), } },
       MuiFormLabel: { styleOverrides: { root: ({ theme }) => ({ fontSize: '1rem', color: theme.palette.text.secondary, '&.Mui-focused': { color: theme.palette.primary.main, }, '&.Mui-error': { color: theme.palette.error.main, } }) } },
       MuiRadio: { styleOverrides: { root: ({ theme }) => ({ color: theme.palette.text.secondary, '&.Mui-checked': { color: theme.palette.primary.main, }, '&.Mui-disabled': { color: theme.palette.action.disabled, } }) } },
       MuiFormControlLabel: { styleOverrides: { label: ({ theme }) => ({ fontSize: '0.95rem', color: theme.palette.text.primary, '&.Mui-disabled': { color: theme.palette.text.disabled, } }) } },
       MuiDivider: { styleOverrides: { root: ({ theme }) => ({ borderColor: theme.palette.divider, marginTop: theme.spacing(3), marginBottom: theme.spacing(3), }) } },
       MuiLinearProgress: { styleOverrides: { root: ({ theme }) => ({ height: '6px', borderRadius: theme.shape.borderRadius, }) } },
       MuiListItemIcon: {
           styleOverrides: {
               root: ({ theme }) => ({
                   minWidth: 'auto', 
                   marginRight: theme.spacing(1.5), 
                   color: theme.palette.primary.main, 
               }),
           }
       },
       MuiListItemText: {
            styleOverrides: {
                primary: ({ theme }) => ({
                    // fontSize: '1rem', // ensure consistency if needed
                }),
            }
       }
     },
  });
};

export { getTheme };