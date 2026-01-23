import fs from 'fs/promises';
import { load } from 'js-yaml';
import path from 'path';

/**
 * JSON Resume Schema interfaces
 */
interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
}

interface Profile {
  network?: string;
  username?: string;
  url?: string;
}

interface Basics {
  name: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

interface Work {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
}

interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  courses?: string[];
}

interface Skill {
  name: string;
  level?: string;
  keywords: string[];
}

interface Certificate {
    name: string;
    date?: string;
    issuer?: string;
    url?: string;
}

interface Resume {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
}

/**
 * Main Parser
 */
async function parseResume() {
  const resumeMdPath = path.resolve('RESUME.md');
  const resumeJsonPath = path.resolve('resume.json');

  console.log(`Reading ${resumeMdPath}...`);
  const content = await fs.readFile(resumeMdPath, 'utf8');

  // 1. Extract YAML Frontmatter
  // We look for the section between the first two '---' markers
  const parts = content.split('---');
  if (parts.length < 3) {
    throw new Error('RESUME.md must contain YAML frontmatter delimited by ---');
  }

  const yamlContent = parts[1].trim();
  const frontmatter = load(yamlContent) as any;
  const markdownBody = parts.slice(2).join('---').trim();

  // 2. Map Frontmatter to JSON Resume
  const resume: Resume = {
    basics: {
      name: frontmatter.name || '',
      label: frontmatter.label || '',
      email: frontmatter.email || '',
      phone: frontmatter.phone || '',
      url: frontmatter.url || '',
      summary: (frontmatter.summary || '').trim(),
      location: frontmatter.location || {
        city: '',
        countryCode: '',
        region: ''
      },
      profiles: frontmatter.profiles || []
    },
    work: [],
    education: frontmatter.education || [],
    skills: frontmatter.skills || [],
    certificates: frontmatter.certificates || []
  };

  // 3. Parse Work Experience from Markdown Body
  // Strategy: 
  // - Headers "## Position @ Company" start a job entry
  // - "_Date Range_" line defines dates
  // - "- " bullet points are highlights
  const lines = markdownBody.split('\n');
  let currentWork: Work | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('## ')) {
      // Save the previous job before starting a new one
      if (currentWork) {
        resume.work.push(currentWork);
      }

      const headerContent = line.replace('## ', '');
      const [position, company] = headerContent.split('@').map(s => s.trim());

      currentWork = {
        position: position || '',
        name: company || '',
        startDate: '',
        endDate: '',
        highlights: []
      };
    } else if (currentWork && line.startsWith('_') && line.endsWith('_')) {
      const dateRange = line.replace(/_/g, '');
      const [start, end] = dateRange.split(/[–-]/).map(d => d.trim());
      currentWork.startDate = start || '';
      currentWork.endDate = end || 'Present';
    } else if (currentWork && line.startsWith('- ')) {
      currentWork.highlights.push(line.replace('- ', '').trim());
    }
  }

  // Final push for the last job entry
  if (currentWork) {
    resume.work.push(currentWork);
  }

  // 4. Handle certificates if they exist in frontmatter but need issuer parsing (as in the sample)
  // The sample RESUME.md has certificates as a simple list of names in frontmatter.
  // We'll normalize them if they are just strings.
  if (frontmatter.certificates && Array.isArray(frontmatter.certificates)) {
    resume.certificates = frontmatter.certificates.map((cert: any) => {
      if (typeof cert === 'string') {
        return { name: cert };
      }
      return cert;
    });
  }

  // 5. Save the generated JSON
  console.log(`Saving to ${resumeJsonPath}...`);
  await fs.writeFile(resumeJsonPath, JSON.stringify(resume, null, 2));
  console.log('Successfully updated resume.json!');
}

parseResume().catch(err => {
    console.error('Error during parsing:', err);
    process.exit(1);
});
