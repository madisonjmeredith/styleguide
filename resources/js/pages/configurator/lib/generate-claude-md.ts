import type { StyleGuideConfig } from '@/types';

export function generateClaudeMd(config: StyleGuideConfig): string {
    return `## Style Guide

This is the design system style guide for this project. Any design implementation should reference the included HTML file for visual inspiration and design token details.

### Reference

Open \`style-guide.html\` (in the same directory as this file) in a browser to see the full visual style guide, including:

- Color palette (primary, secondary, and neutral scales)
- Typography specimens (headings, body, secondary text)
- Button styles and hover states
- Card layouts and pagination
- Form fields and inputs
- Modals, alerts, and badges
- Breadcrumbs and tables

The HTML file is self-contained with all design tokens documented in CSS comments at the top of the stylesheet.
`;
}
