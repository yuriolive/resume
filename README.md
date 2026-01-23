# Markdown to JSON Resume Parser

This tool parses a structured Markdown file (`RESUME.md`) into a `resume.json` file that follows the [JSON Resume](https://jsonresume.org/schema) standard.

## Features

- 📄 **Markdown-first**: Edit your resume in your favorite text editor.
- ⚙️ **YAML + Markdown**: Use YAML for structured data (basics, skills) and Markdown for narrative sections (experience).
- 🚀 **Bun-powered**: Fast parsing with TypeScript.
- 🛠️ **Scalable**: Works for anyone; just edit the `RESUME.md`.

## Prerequisites

- [Bun](https://bun.sh/) installed on your system.

## Getting Started

1. **Install dependencies**:

   ```bash
   bun install
   ```

2. **Edit your resume**:
   Modify `RESUME.md` following the established structure (YAML frontmatter + Markdown body).

3. **Generate JSON**:
   Run the build script:
   ```bash
   bun run build
   ```
   This will update the `resume.json` file.

## Markdown Structure

### Frontmatter (YAML)

The top of your `RESUME.md` should contain metadata:

```yaml
---
name: Your Name
label: Job Title
email: your@email.com
# ... other structured fields
---
```

### Body

Use headers for work experience:

```markdown
## Job Title @ Company Name

_Start Date – End Date_

- Accomplishment 1
- Accomplishment 2
```

## Maintenance

The parser logic is located in `scripts/parse-resume.ts`.
