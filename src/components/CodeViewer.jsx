// components/CodeSnippetViewer.jsx
import React from 'react';
import { Box, Paper, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';

export default function CodeSnippetViewer({ code, language, title }) {
  const getLanguageColor = (lang) => {
    const colors = {
      javascript: '#f7df1e',
      python: '#3776ab',
      css: '#1572b6',
      html: '#e34c26',
      typescript: '#007acc',
    };
    return colors[lang] || '#8978b1ff';
  };

  return (
    <Paper 
      sx={{ 
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #334155',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ color: '#f8fafc', fontWeight: 600 }}>
          {title}
        </Box>
        <Chip
          label={language}
          size="small"
          sx={{
            backgroundColor: getLanguageColor(language),
            color: 'white',
            fontWeight: 500,
          }}
        />
      </Box>

      {/* Read-only Editor */}
      <Editor
        height="300px"
        language={language}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true, // Make it read-only
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          renderLineHighlight: 'none',
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          contextmenu: false, // Disable right-click menu
        }}
      />
    </Paper>
  );
}