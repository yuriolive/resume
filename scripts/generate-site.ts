import fs from 'fs/promises';
import path from 'path';
import { render } from '../themes/urban-techno/index.js';

async function generateSite() {
  const resumeJsonPath = path.resolve('resume.json');
  const publicDir = path.resolve('public');
  const outputHtmlPath = path.join(publicDir, 'index.html');

  console.log(`Loading resume from ${resumeJsonPath}...`);
  const resumeRaw = await fs.readFile(resumeJsonPath, 'utf8');
  const resume = JSON.parse(resumeRaw);

  console.log('Rendering theme...');
  const html = render(resume);

  console.log(`Ensuring directory ${publicDir} exists...`);
  await fs.mkdir(publicDir, { recursive: true });

  // Copy assets to public
  const assetsSrc = path.resolve('assets');
  const assetsDest = path.join(publicDir, 'assets');
  try {
    const assetsExist = await fs.stat(assetsSrc).then(() => true).catch(() => false);
    if (assetsExist) {
        console.log(`Copying assets from ${assetsSrc} to ${assetsDest}...`);
        await fs.cp(assetsSrc, assetsDest, { recursive: true });
    }
  } catch (err) {
    console.warn('Warning: Could not copy assets folder:', err);
  }

  console.log(`Writing to ${outputHtmlPath}...`);
  await fs.writeFile(outputHtmlPath, html, 'utf8');
  console.log('Site generated successfully!');
}

generateSite().catch(err => {
  console.error('Error generating site:', err);
  process.exit(1);
});
