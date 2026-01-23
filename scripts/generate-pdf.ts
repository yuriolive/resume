import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs/promises';

async function generatePdf() {
  const htmlPath = path.resolve('public/index.html');
  const pdfPath = path.resolve('resume.pdf');

  console.log('Launching Chromium...');
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  console.log('Browser launched.');

  const page = await browser.newPage();
  console.log('New page created.');

  const absoluteHtmlPath = `file://${htmlPath.replace(/\\/g, '/')}`;
  console.log(`Navigating to: ${absoluteHtmlPath}`);
  
  try {
    await page.goto(absoluteHtmlPath, { 
        waitUntil: 'networkidle',
        timeout: 30000 
    });
    console.log('Page loaded.');

    console.log('Generating PDF...');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            bottom: '10mm',
            left: '10mm',
            right: '10mm'
        }
    });
    console.log(`PDF successfully saved to ${pdfPath}`);
  } catch (err) {
    console.error('Error during navigation or PDF generation:', err);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}


generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
