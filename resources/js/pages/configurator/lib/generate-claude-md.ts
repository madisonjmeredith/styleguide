import { ICON_LIBRARIES, NEUTRAL_PRESETS, lookupFontMeta } from '../data';
import type { StyleGuideConfig } from '@/types';

export function generateClaudeMd(config: StyleGuideConfig): string {
    const neutralLabel = NEUTRAL_PRESETS[config.neutralFamily].label;
    const n = NEUTRAL_PRESETS[config.neutralFamily].values;
    const iconLib = ICON_LIBRARIES.find((l) => l.id === config.iconLibrary);
    const hfMeta = lookupFontMeta(config.headingFont, config.headingFontMeta);
    const bfMeta = lookupFontMeta(config.bodyFont, config.bodyFontMeta);
    const hfFallback = hfMeta.category === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';
    const bfFallback = bfMeta.category === 'sans-serif' ? 'system-ui, sans-serif' : 'Georgia, serif';

    return `# Design System

## Colors

- **Primary**: \`${config.primaryColor}\` — Use for buttons, links, active states, and accents. Generate tints/shades from this hex as needed.
- **Secondary**: \`${config.secondaryColor}\` — Use for secondary actions, highlights, and supporting accents.
- **Neutral family**: ${neutralLabel} — Use for text, backgrounds, borders, and muted elements.

### Neutral Scale
| Step | Hex |
|------|-----|
${Object.entries(n)
    .map(([step, hex]) => `| ${step} | \`${hex}\` |`)
    .join('\n')}

### CSS Custom Properties
\`\`\`css
--color-primary: ${config.primaryColor};
--color-secondary: ${config.secondaryColor};
--color-neutral-50: ${n[50]};
--color-neutral-100: ${n[100]};
--color-neutral-200: ${n[200]};
--color-neutral-300: ${n[300]};
--color-neutral-400: ${n[400]};
--color-neutral-500: ${n[500]};
--color-neutral-600: ${n[600]};
--color-neutral-700: ${n[700]};
--color-neutral-800: ${n[800]};
--color-neutral-900: ${n[900]};
\`\`\`

## Typography

- **Heading font**: \`'${config.headingFont}', ${hfFallback}\` (${hfMeta.category}, via Google Fonts)
- **Body font**: \`'${config.bodyFont}', ${bfFallback}\` (${bfMeta.category}, via Google Fonts)

### Usage
- Headings (h1–h4) use the heading font at weight 700
- Body text uses the body font at weight 400, with 500/600 for emphasis
- Body text color: neutral-700 (\`${n[700]}\`)
- Heading color: neutral-900 (\`${n[900]}\`)
- Secondary/caption text: neutral-500 (\`${n[500]}\`)

## Icons

- **Library**: ${iconLib?.label ?? config.iconLibrary}
${config.iconLibrary === 'fontawesome' ? '- Use CSS classes: `fa-solid fa-icon-name`, `fa-regular fa-icon-name`\n- CDN: Font Awesome 6' : ''}${config.iconLibrary === 'heroicons' ? '- Use inline SVGs from the Heroicons library (by the Tailwind CSS team)\n- Outline (24px) and Solid (24px) styles available\n- No CDN needed — paste SVGs directly or use the React/Vue components' : ''}${config.iconLibrary === 'feather' ? '- Use `data-feather="icon-name"` attribute on elements\n- Lightweight stroke-based icons\n- Initialize with `feather.replace()` after DOM load' : ''}

## Surface & Shape

- **Borders**: ${config.borderEnabled ? `Enabled — \`1px solid ${n[200]}\`` : 'Disabled — borderless/flat design'}
- **Shadows**: ${config.shadowEnabled ? 'Enabled — `0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05)`' : 'Disabled — flat design, no elevation'}
- **Border radius**: \`${config.radius}px\` on all components (buttons, cards, inputs, alerts). Fully-rounded elements (pills, avatars, badges) always use \`9999px\`.

## Component Patterns

### Buttons
- **Primary**: Background \`--color-primary\`, white text, \`--radius\` corners
- **Secondary**: Background \`--color-secondary\`, white text
- **Outline**: Transparent background, neutral-700 text, border from \`--border\`
- **Text/Link**: No background, primary color text, underline with 2px offset
- **Disabled**: Background neutral-200, neutral-400 text, \`cursor: not-allowed\`
- Sizes: sm (6px 14px), default (10px 20px), lg (14px 28px)

### Cards
- White background, \`--border\`, \`--radius\`, \`--shadow\`
- Title uses heading font at weight 700
- Body text uses neutral-600
- Optional: header image area, footer with action buttons

### Form Fields
- Full-width inputs with \`--border\`, \`--radius\`
- Labels: 0.8rem, weight 600, neutral-700
- Focus state: primary color border + 3px primary ring (15% opacity)
- Hints: 0.75rem, neutral-400

### Badges
- Pill-shaped (9999px radius), 0.75rem, weight 600
- Success: green-50 bg, green-800 text
- Warning: amber-50 bg, amber-800 text
- Danger: red-50 bg, red-800 text

### Alerts
- \`--radius\` corners, 4px left border
- Success: green-50 bg, green border, green-800 text
- Warning: amber-50 bg, amber border, amber-800 text
- Danger: red-50 bg, red border, red-800 text

### Tables
- Full-width, collapse borders
- Header: neutral-50 bg, uppercase 0.75rem labels, neutral-500 text
- Rows: neutral-100 bottom border, hover shows neutral-50 bg
`;
}
