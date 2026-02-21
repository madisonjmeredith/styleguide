import { BODY_LINE_HEIGHT_VALUES, HEADING_LETTER_SPACING_VALUES, ICON_LIBRARIES, NEUTRAL_PRESETS, TYPE_SCALE_OPTIONS, TYPE_SCALE_SIZES, lookupFontMeta, shade, tint } from '../data';
import type { StyleGuideConfig } from '@/types';

export function generateClaudeMd(config: StyleGuideConfig): string {
    const neutralLabel = NEUTRAL_PRESETS[config.neutralFamily].label;
    const n = NEUTRAL_PRESETS[config.neutralFamily].values;
    const iconLib = ICON_LIBRARIES.find((l) => l.id === config.iconLibrary);
    const hfMeta = lookupFontMeta(config.headingFont, config.headingFontMeta);
    const bfMeta = lookupFontMeta(config.bodyFont, config.bodyFontMeta);
    const hfFallback = hfMeta.category === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';
    const bfFallback = bfMeta.category === 'sans-serif' ? 'system-ui, sans-serif' : 'Georgia, serif';
    const ts = TYPE_SCALE_SIZES[config.typeScale ?? 'regular'];
    const typeScaleLabel = TYPE_SCALE_OPTIONS.find((o) => o.id === (config.typeScale ?? 'regular'))?.label ?? 'Regular';

    const headingFontWeight = config.headingFontWeight ?? 700;
    const bodyFontWeight = config.bodyFontWeight ?? 400;
    const headingLetterSpacingLabel = config.headingLetterSpacing ?? 'normal';
    const headingLetterSpacing = HEADING_LETTER_SPACING_VALUES[headingLetterSpacingLabel];
    const bodyLineHeightLabel = config.bodyLineHeight ?? 'comfortable';
    const bodyLineHeight = BODY_LINE_HEIGHT_VALUES[bodyLineHeightLabel];
    const headingTextTransform = config.headingTextTransform ?? 'none';
    const buttonTextTransform = config.buttonTextTransform ?? 'none';

    const linkBaseColor = config.linkColor === 'secondary' ? config.secondaryColor : config.primaryColor;
    const linkColorLabel = config.linkColor === 'secondary' ? 'secondary' : 'primary';
    const linkHoverColor =
        config.linkHoverColor === 'darker' ? shade(linkBaseColor, 0.25) : config.linkHoverColor === 'lighter' ? tint(linkBaseColor, 0.3) : linkBaseColor;
    const linkUnderline = config.linkUnderline !== false;

    const title = config.name ? config.name : 'Design System';

    return `# ${title}

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
- **Type scale**: ${typeScaleLabel}
- **Heading font weight**: \`${headingFontWeight}\`
- **Body font weight**: \`${bodyFontWeight}\`
- **Heading letter spacing**: ${headingLetterSpacingLabel} (\`${headingLetterSpacing}\`)
- **Body line height**: ${bodyLineHeightLabel} (\`${bodyLineHeight}\`)
- **Heading text transform**: \`${headingTextTransform}\`

### Font Sizes
| Element | Size |
|---------|------|
| H1 | \`${ts.h1}px\` |
| H2 | \`${ts.h2}px\` |
| H3 | \`${ts.h3}px\` |
| Body | \`${ts.body}px\` |
| Secondary | \`${ts.secondary}px\` |
| Small | \`${ts.small}px\` |

### Usage
- Headings (h1–h4) use the heading font at weight ${headingFontWeight}${headingLetterSpacing !== '0' ? `, letter-spacing \`${headingLetterSpacing}\`` : ''}${headingTextTransform !== 'none' ? `, text-transform \`${headingTextTransform}\`` : ''}
- Body text uses the body font at weight ${bodyFontWeight}, line-height \`${bodyLineHeight}\`
- Body text color: neutral-700 (\`${n[700]}\`)
- Heading color: neutral-900 (\`${n[900]}\`)
- Secondary/caption text: neutral-500 (\`${n[500]}\`)

## Icons

- **Library**: ${iconLib?.label ?? config.iconLibrary}
${config.iconLibrary === 'fontawesome-solid' ? '- Use CSS classes: `fa-solid fa-icon-name`\n- CDN: Font Awesome 6' : ''}${config.iconLibrary === 'fontawesome-regular' ? '- Use CSS classes: `fa-regular fa-icon-name`\n- Lightweight outline/regular style variant\n- CDN: Font Awesome 6' : ''}${config.iconLibrary === 'heroicons' ? '- Use inline SVGs from the Heroicons library (by the Tailwind CSS team)\n- Outline (24px) and Solid (24px) styles available\n- No CDN needed — paste SVGs directly or use the React/Vue components' : ''}${config.iconLibrary === 'lucide' ? '- Use inline SVG components from Lucide\n- Install: `npm install lucide-react` (or `lucide-vue-next`, `lucide-svelte`)\n- Import individual icons: `import { Home, Search } from "lucide-react"`' : ''}${config.iconLibrary === 'material-symbols' ? '- Use Material Symbols (Rounded) from Google\n- Install: `npm install @material-symbols/svg-400` or load via Google Fonts CDN\n- CSS class approach: `<span class="material-symbols-rounded">home</span>`' : ''}

## Surface & Shape

- **Borders**: ${config.borderWidth === 0 ? 'None — borderless/flat design (transparent borders for layout stability)' : `\`${config.borderWidth}px solid ${n[200]}\``}
- **Shadows**: ${config.shadowEnabled ? 'Enabled — `0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05)`' : 'Disabled — flat design, no elevation'}
- **Border radius**: \`${config.radius}px\` on all components (buttons, cards, inputs, alerts). Fully-rounded elements (pills, avatars, badges) always use \`9999px\`.

## Links

- **Color**: \`${linkBaseColor}\` (${linkColorLabel})
- **Hover color**: \`${linkHoverColor}\`${config.linkHoverColor === 'none' ? ' (no change)' : ` (${config.linkHoverColor})`}
- **Underline**: ${linkUnderline ? 'Yes' : 'No'}
- **Underline on hover**: ${config.linkUnderlineOnHover === 'show' ? 'Show underline' : config.linkUnderlineOnHover === 'remove' ? 'Remove underline' : 'No change'}

### CSS Custom Properties
\`\`\`css
--link-color: ${linkBaseColor};
--link-hover-color: ${linkHoverColor};
--link-decoration: ${linkUnderline ? 'underline' : 'none'};
--link-hover-decoration: ${config.linkUnderlineOnHover === 'show' ? 'underline' : config.linkUnderlineOnHover === 'remove' ? 'none' : linkUnderline ? 'underline' : 'none'};
\`\`\`

## Transitions

- **Duration**: \`${config.transitionDuration}ms\`
- **Easing**: \`ease\`
- Apply to all interactive state changes (hover, focus, active): \`transition: all ${config.transitionDuration}ms ease\`

### CSS Custom Properties
\`\`\`css
--transition-duration: ${config.transitionDuration}ms;
--transition-easing: ease;
\`\`\`

## Component Patterns

### Buttons
- **Button style**: ${(config.buttonStyle ?? 'filled') === 'outline' ? 'Outline — transparent background with colored border, fills with color on hover' : 'Filled — solid background with white text'}
- **Primary**: ${(config.buttonStyle ?? 'filled') === 'outline' ? `Transparent background, \`${config.primaryColor}\` border and text, fills on hover` : `Background \`--color-primary\`, white text`}, \`--radius\` corners
- **Secondary**: ${(config.buttonStyle ?? 'filled') === 'outline' ? `Transparent background, \`${config.secondaryColor}\` border and text, fills on hover` : `Background \`--color-secondary\`, white text`}
- **Outline**: Transparent background, neutral-700 text, border from \`--border\`
- **Text/Link**: No background, link color text, uses link decoration settings
- **Disabled**: Background neutral-200, neutral-400 text, \`cursor: not-allowed\`
- **Text transform**: \`${buttonTextTransform}\`
- **Hover style**: ${config.buttonHoverStyle === 'darker' ? `Darken — primary hover: \`${shade(config.primaryColor, 0.15)}\`, secondary hover: \`${shade(config.secondaryColor, 0.15)}\`` : config.buttonHoverStyle === 'lighter' ? `Lighten — primary hover: \`${tint(config.primaryColor, 0.2)}\`, secondary hover: \`${tint(config.secondaryColor, 0.2)}\`` : config.buttonHoverStyle === 'glow' ? `Glow — colored \`box-shadow: 0 0 0 4px\` ring using tinted variant of button color` : `Lift — \`transform: translateY(-2px)\` with \`box-shadow: 0 4px 12px rgba(0,0,0,0.15)\``}
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
- \`--radius\` corners, 0.75rem, font-weight 500, padding \`2px 8px\`
- Success: green-100 bg (\`#dcfce7\`), green-700 text (\`#15803d\`)
- Warning: yellow-100 bg (\`#fef9c3\`), yellow-800 text (\`#854d0e\`)
- Danger: red-100 bg (\`#fee2e2\`), red-700 text (\`#b91c1c\`)

### Alerts
- Layout: icon (20px) on left, title + description on right, \`--radius\` corners
- Success: green-50 bg (\`#f0fdf4\`), green-400 icon, green-800 title, green-700 body
- Warning: yellow-50 bg (\`#fefce8\`), yellow-400 icon, yellow-800 title, yellow-700 body
- Danger: red-50 bg (\`#fef2f2\`), red-400 icon, red-800 title, red-700 body
- Title: font-weight 500, body font
- Icon: use the selected icon library's check-circle, warning-triangle, and x-circle variants

### Tables
- Full-width, collapse borders
- Header: neutral-50 bg, uppercase 0.75rem labels, neutral-500 text
- Rows: neutral-100 bottom border, hover shows neutral-50 bg

### Pagination
- Inline-flex nav with \`--radius\` on outer corners, \`box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)\`
- Page links: \`inset 0 0 0 1px neutral-300\` ring, \`margin-left: -1px\` for overlap, font-weight 600, small font size
- Active page: primary color background, white text, no inset ring
- Prev/next arrows: neutral-400, 20px SVG chevrons
- Ellipsis: neutral-500 text, non-interactive
`;
}
