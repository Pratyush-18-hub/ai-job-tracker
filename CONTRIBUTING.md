# Contributing Guide

Thanks for contributing to AI Job Tracker.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`.
4. Start development server:
   ```bash
   npm run dev
   ```

## Pull Request Process

1. Create a focused branch for your change.
2. Keep PRs small and clearly scoped.
3. Run checks before opening a PR:
   ```bash
   npm run lint
   npm run build
   ```
4. Include:
   - what changed
   - why it changed
   - screenshots for UI changes (if applicable)
5. Link related issues in the PR description.

## Code Style

- Follow existing React component patterns.
- Prefer descriptive names over abbreviations.
- Avoid unrelated refactors in the same PR.

## Reporting Bugs

Please use the bug report template and include:
- reproduction steps
- expected vs actual behavior
- environment details (browser, OS, API URL)
