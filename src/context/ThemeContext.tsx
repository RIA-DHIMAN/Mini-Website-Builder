import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

const defaultColorSchemes = [
  {
    name: 'Default',
    colors: {
      primary: '#4F46E5',
      secondary: '#6366F1',
      accent: '#4338CA',
      background: '#F9FAFB'
    }
  },
  {
    name: 'Ocean',
    colors: {
      primary: '#0EA5E9',
      secondary: '#0284C7',
      accent: '#0369A1',
      background: '#F0F9FF'
    }
  },
  {
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      accent: '#047857',
      background: '#ECFDF5'
    }
  },
  {
    name: 'Sunset',
    colors: {
      primary: '#DB2777',
      secondary: '#EC4899',
      accent: '#BE185D',
      background: '#FDF2F8'
    }
  }
];

export { defaultColorSchemes };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorScheme, setColorScheme] = useState(defaultColorSchemes[0].colors);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('pagecraft_theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load saved color scheme from localStorage
    const savedColorScheme = localStorage.getItem('pagecraft_color_scheme');
    if (savedColorScheme) {
      setColorScheme(JSON.parse(savedColorScheme));
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('dark', 'light');
    root.classList.add(theme);

    // Save theme to localStorage
    localStorage.setItem('pagecraft_theme', theme);

    // Update CSS variables based on theme
    if (theme === 'dark') {
      // Dark theme colors
      root.style.setProperty('--primary', '#76ABAE');
      root.style.setProperty('--secondary', '#31363F');
      root.style.setProperty('--accent', '#EEEEEE');
      root.style.setProperty('--background', '#222831');
      root.style.setProperty('--surface', '#31363F');
      root.style.setProperty('--text-primary', '#EEEEEE');
      root.style.setProperty('--text-secondary', '#76ABAE');
      root.style.setProperty('--border', '#31363F');
    } else {
      // Light theme colors
      root.style.setProperty('--primary', colorScheme.primary);
      root.style.setProperty('--secondary', colorScheme.secondary);
      root.style.setProperty('--accent', colorScheme.accent);
      root.style.setProperty('--background', colorScheme.background);
      root.style.setProperty('--surface', '#FFFFFF');
      root.style.setProperty('--text-primary', '#1F2937');
      root.style.setProperty('--text-secondary', '#6B7280');
      root.style.setProperty('--border', '#E5E7EB');
    }

    // Save color scheme to localStorage
    localStorage.setItem('pagecraft_color_scheme', JSON.stringify(colorScheme));
  }, [theme, colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}