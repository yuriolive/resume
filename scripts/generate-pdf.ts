import { chromium } from 'playwright';
import path from 'path';

async function generatePdf() {
  const htmlPath = path.resolve('public/index.html');
  const pdfPath = path.resolve('resume.pdf');

  console.log('Launching Chromium with Node...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
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
            top: '0',
            bottom: '0',
            left: '0',
            right: '0'
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
