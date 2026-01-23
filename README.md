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

4. **Generate Website & PDF**:
   - For HTML: `bun run generate:site` (outputs to `public/index.html`)
   - For PDF: `bun run generate:pdf` (outputs to `resume.pdf`)

> [!TIP]
> If `generate:pdf` hangs in your environment, simply run `generate:site`, open `public/index.html` in your browser, and print to PDF manually.

## Documentation

- [PRD.md](file:///c:/Users/yuri_/IdeaProjects/resume/PRD.md): Project requirements.

## Maintenance

The logic is split into:

- `scripts/parse-resume.ts`: Markdown to JSON parsing.
- `scripts/generate-site.ts`: JSON to HTML rendering.
- `scripts/generate-pdf.ts`: HTML to PDF conversion.
