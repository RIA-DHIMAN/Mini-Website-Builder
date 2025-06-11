import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { useTheme, defaultColorSchemes } from '../context/ThemeContext';
import JSZip from 'jszip';

interface ThemeSelectorProps {
  template: any;
}

function ThemeSelector({ template }: ThemeSelectorProps) {
  const { theme, toggleTheme, setColorScheme } = useTheme();

  const downloadTemplate = async () => {
    const zip = new JSZip();
    
    // Add template data
    zip.file('template.json', JSON.stringify(template, null, 2));
    
    // Add basic HTML structure
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="./styles.css" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script src="./main.js"></script>
</body>
</html>`;
    
    zip.file('index.html', htmlContent);
    
    // Add CSS with current theme and color scheme
    const cssContent = `
/* Generated styles */
:root {
  --primary: ${template.colorScheme?.primary || '#4F46E5'};
  --secondary: ${template.colorScheme?.secondary || '#6366F1'};
  --accent: ${template.colorScheme?.accent || '#4338CA'};
  --background: ${template.colorScheme?.background || '#F9FAFB'};
}

/* Add your custom styles here */
`;
    
    zip.file('styles.css', cssContent);
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = window.URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}-template.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={downloadTemplate}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Schemes</h3>
        <div className="grid grid-cols-2 gap-3">
          {defaultColorSchemes.map((scheme, index) => (
            <button
              key={index}
              onClick={() => setColorScheme(scheme.colors)}
              className="p-3 border rounded-md hover:border-indigo-500 transition-colors"
            >
              <div className="flex space-x-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.colors.primary }} />
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.colors.secondary }} />
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.colors.accent }} />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{scheme.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;