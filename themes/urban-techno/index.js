import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Resume from './src/Resume.jsx';

export function render(resume) {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(<Resume resume={resume} />));
  const styles = sheet.getStyleTags();
  const title = (resume.basics && resume.basics.name) || 'Resume';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
  ${styles}
<style>
  body { margin: 0; padding: 0; background: #000; }
  @media print { 
    html, body { 
      background: #000 !important; 
      -webkit-print-color-adjust: exact; 
      print-color-adjust: exact; 
    } 
  }
</style>
</head>
<body style="margin: 0; padding: 0;">
  ${html}
  <script>
    document.getElementById('export-pdf-btn').addEventListener('click', function() {
      window.print();
    });
  </script>
</body>
</html>`;
}
