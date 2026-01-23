# Product Requirements Document (PRD) - Markdown Resume Parser

## Overview

The goal of this project is to create a robust, scalable tool that parses a resume written in Markdown (with YAML frontmatter) into the standard [JSON Resume](https://jsonresume.org/schema) format. This allows for a "source-controlled" resume that can be easily transformed into various formats (PDF, HTML, etc.) using existing JSON Resume themes.

## Target Audience

- Developers who want to manage their resume as code.
- Recruiters or HR tech looking to automate resume ingestion from Markdown sources.

## Key Features

- **YAML Frontmatter Support**: Handle structured data like contact info, skills, and education in the Markdown header.
- **Narrative Experience Parsing**: Extract professional experience from the Markdown body using clear heading and bullet-point patterns.
- **Scalable Architecture**: Avoid hard-coding specific names or entities; the parser should work for any valid Markdown resume following the defined structure.
- **TypeScript Implementation**: Built with TypeScript for better maintainability and type safety.
- **Bun Support**: Fast execution and built-in TypeScript support using Bun.

## Technical Requirements

- **Runtime**: Bun (or Node.js with TypeScript support).
- **Libraries**: `js-yaml` for frontmatter parsing.
- **Output**: A local `resume.json` file compliant with the JSON Resume schema.

## Non-Functional Requirements

- **Readability**: The `RESUME.md` should remain human-readable and look like a standard Markdown document.
- **Consistency**: The parser should be idempotent and produce the same JSON output for the same Markdown input.
