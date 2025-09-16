// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: "#6366f1", // Modern indigo - professional yet vibrant
      light: "#8b5cf6",
      dark: "#4338ca",
      contrastText: "#ffffff",
    },
    secondary: { 
      main: "#10b981", // Fresh green accent for success states
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    background: {
      default:'linear-gradient(to top, rgba(112, 96, 150, 1) 50%, rgba(191, 192, 196, 1) 100%)', // Rich dark blue - more sophisticated than black
      paper: "#1e293b",   // Elevated surface color
    },
    surface: {
      main: "#334155",    // For borders, dividers
      light: "#475569",   // Hover states
    },
    text: {
      primary: "#f8fafc",    // High contrast white
      secondary: "#cbd5e1",  // Softer secondary text
      disabled: "#64748b",   // Disabled text
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    // Custom colors for developer-specific elements
    code: {
      background: "#1a1a2e",
      text: "#eee8d5",
      comment: "#93a1a1",
      keyword: "#268bd2",
      string: "#2aa198",
    }
  },
  
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
    
    // Display text (hero sections, major headings)
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      '@media (max-width:768px)': {
        fontSize: "2.5rem",
      },
    },
    
    // Page titles
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.2,
      '@media (max-width:768px)': {
        fontSize: "2rem",
      },
    },
    
    // Section headings
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    
    // Card titles, component headers
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0em",
      lineHeight: 1.4,
    },
    
    // Subheadings
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      letterSpacing: "0em",
      lineHeight: 1.5,
    },
    
    // Small headings
    h6: {
      fontSize: "1.125rem",
      fontWeight: 500,
      letterSpacing: "0em",
      lineHeight: 1.5,
    },
    
    // Body text
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    
    // Secondary body text
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    
    // Button text
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      textTransform: "none", // Remove uppercase transformation
    },
    
    // Small text, captions
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.03em",
      lineHeight: 1.4,
    },
    
    // Overlines, labels
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
  },
  
  shape: {
    borderRadius: 8, // Consistent rounded corners
  },
  
  spacing: 8, // 8px base spacing unit
  
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.2)', // Subtle shadow
    '0px 4px 6px rgba(0, 0, 0, 0.1)', // Card shadow
    '0px 10px 15px rgba(0, 0, 0, 0.1)', // Elevated shadow
    '0px 20px 25px rgba(0, 0, 0, 0.15)', // High elevation
    // Add more custom shadows as needed
  ],
  
  components: {
    // Button customizations
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
          },
        },
      },
    },
    
    // Card customizations
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #334155',
          backgroundImage: 'none',
          '&:hover': {
            borderColor: '#475569',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
    },
    
    // Paper customizations
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #334155',
        },
      },
    },
    
    // Input field customizations
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#334155',
            },
            '&:hover fieldset': {
              borderColor: '#475569',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1',
            },
          },
        },
      },
    },
    
    // AppBar/Navigation customizations
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #334155',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;