import { BODY_LINE_HEIGHT_VALUES, HEADING_LETTER_SPACING_VALUES, ICON_LIBRARIES, NEUTRAL_PRESETS, TYPE_SCALE_OPTIONS, TYPE_SCALE_SIZES, googleFontsUrl, lookupFontMeta, shade, tint } from '../data';
import type { StyleGuideConfig } from '@/types';

export function generateHTML(config: StyleGuideConfig): string {
    const n = NEUTRAL_PRESETS[config.neutralFamily].values;
    const hfMeta = lookupFontMeta(config.headingFont, config.headingFontMeta);
    const bfMeta = lookupFontMeta(config.bodyFont, config.bodyFontMeta);
    const fontsUrl = googleFontsUrl([
        { name: config.headingFont, weights: hfMeta.weights },
        { name: config.bodyFont, weights: bfMeta.weights },
    ]);
    const neutralLabel = NEUTRAL_PRESETS[config.neutralFamily].label;
    const borderVal = config.borderWidth === 0 ? '1px solid transparent' : `${config.borderWidth}px solid var(--color-neutral-200)`;
    const shadowVal = config.shadowEnabled
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)'
        : 'none';
    const iconLabel = ICON_LIBRARIES.find((l) => l.id === config.iconLibrary)?.label || 'Heroicons';
    const ts = TYPE_SCALE_SIZES[config.typeScale ?? 'regular'];
    const typeScaleLabel = TYPE_SCALE_OPTIONS.find((o) => o.id === (config.typeScale ?? 'regular'))?.label ?? 'Regular';
    const hfFallback = hfMeta.category === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';
    const bfFallback = bfMeta.category === 'sans-serif' ? 'system-ui, sans-serif' : 'Georgia, serif';

    const headingFontWeight = config.headingFontWeight ?? 700;
    const bodyFontWeight = config.bodyFontWeight ?? 400;
    const headingLetterSpacing = HEADING_LETTER_SPACING_VALUES[config.headingLetterSpacing ?? 'normal'];
    const bodyLineHeight = BODY_LINE_HEIGHT_VALUES[config.bodyLineHeight ?? 'comfortable'];
    const headingTextTransform = config.headingTextTransform ?? 'none';
    const buttonTextTransform = config.buttonTextTransform ?? 'none';

    const isOutlineStyle = (config.buttonStyle ?? 'filled') === 'outline';
    const outlineBorderWidth = Math.max(config.borderWidth, 1);

    const linkBaseColor = config.linkColor === 'secondary' ? config.secondaryColor : config.primaryColor;
    const linkHoverColor =
        config.linkHoverColor === 'darker' ? shade(linkBaseColor, 0.25) : config.linkHoverColor === 'lighter' ? tint(linkBaseColor, 0.3) : linkBaseColor;
    const linkUnderline = config.linkUnderline !== false;
    const linkHoverUnderline = config.linkUnderlineOnHover ?? 'none';

    const allNeutralComments = Object.entries(NEUTRAL_PRESETS)
        .map(([, preset]) => `           ${preset.label.padEnd(14)} ${Object.values(preset.values).join(' ')}`)
        .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name || 'Style Guide'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${fontsUrl}" rel="stylesheet">
  <style>
    :root {
      --color-primary: ${config.primaryColor};
      --color-secondary: ${config.secondaryColor};

      /* Neutral Family: ${neutralLabel}
${allNeutralComments} */
      --color-neutral-50:  ${n[50]};
      --color-neutral-100: ${n[100]};
      --color-neutral-200: ${n[200]};
      --color-neutral-300: ${n[300]};
      --color-neutral-400: ${n[400]};
      --color-neutral-500: ${n[500]};
      --color-neutral-600: ${n[600]};
      --color-neutral-700: ${n[700]};
      --color-neutral-800: ${n[800]};
      --color-neutral-900: ${n[900]};
      --color-white: #ffffff;

      --font-heading: '${config.headingFont}', ${hfFallback};
      --font-body: '${config.bodyFont}', ${bfFallback};

      /* Type scale: ${typeScaleLabel} */
      --font-size-h1: ${ts.h1}px;
      --font-size-h2: ${ts.h2}px;
      --font-size-h3: ${ts.h3}px;
      --font-size-body: ${ts.body}px;
      --font-size-secondary: ${ts.secondary}px;
      --font-size-small: ${ts.small}px;

      --font-weight-heading: ${headingFontWeight};
      --font-weight-body: ${bodyFontWeight};
      --letter-spacing-heading: ${headingLetterSpacing};
      --line-height-body: ${bodyLineHeight};

      --border: ${borderVal};
      --radius: ${config.radius}px;
      --shadow: ${shadowVal};

      /* Links */
      --link-color: ${linkBaseColor};
      --link-hover-color: ${linkHoverColor};
      --link-decoration: ${linkUnderline ? 'underline' : 'none'};
      --link-hover-decoration: ${linkHoverUnderline === 'show' ? 'underline' : linkHoverUnderline === 'remove' ? 'none' : `var(--link-decoration)`};

      /* Button hover: ${config.buttonHoverStyle} */
      --btn-primary-hover-bg: ${config.buttonHoverStyle === 'darker' ? shade(config.primaryColor, 0.15) : config.buttonHoverStyle === 'lighter' ? tint(config.primaryColor, 0.2) : config.primaryColor};
      --btn-secondary-hover-bg: ${config.buttonHoverStyle === 'darker' ? shade(config.secondaryColor, 0.15) : config.buttonHoverStyle === 'lighter' ? tint(config.secondaryColor, 0.2) : config.secondaryColor};

      /* Transitions */
      --transition-duration: ${config.transitionDuration}ms;
      --transition-easing: ease;

      /* Icon library: ${iconLabel} */
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--font-body);
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-body);
      color: var(--color-neutral-800);
      background: var(--color-neutral-50);
      line-height: var(--line-height-body);
    }

    .guide { max-width: 960px; margin: 0 auto; padding: 48px 24px 80px; }
    .guide-header { margin-bottom: 56px; padding-bottom: 32px; border-bottom: 2px solid var(--color-neutral-900); }
    .guide-header h1 { font-family: var(--font-heading); font-size: 2rem; font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-900); margin-bottom: 8px; }
    .guide-header p { color: var(--color-neutral-500); font-size: 0.95rem; }

    .section { margin-bottom: 56px; }
    .section-title { font-family: var(--font-heading); font-size: 1.35rem; font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-900); margin-bottom: 8px; }
    .section-desc { color: var(--color-neutral-500); font-size: 0.875rem; margin-bottom: 24px; }
    .section-desc code { background: var(--color-neutral-100); padding: 1px 5px; border-radius: 3px; font-size: 0.8rem; }
    .subsection { margin-bottom: 32px; }
    .subsection-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-neutral-400); margin-bottom: 12px; }

    .color-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .color-card { border-radius: var(--radius); overflow: hidden; border: var(--border); }
    .color-card-swatch { height: 80px; }
    .color-card-info { padding: 12px; background: var(--color-white); }
    .color-card-name { font-size: 0.8rem; font-weight: 600; color: var(--color-neutral-800); }
    .color-card-hex { font-size: 0.75rem; font-family: monospace; color: var(--color-neutral-400); }

    .neutral-strip { display: flex; border-radius: var(--radius); overflow: hidden; border: var(--border); }
    .neutral-chip { flex: 1; aspect-ratio: 1; min-height: 48px; display: flex; align-items: flex-end; justify-content: center; padding: 6px 2px; }
    .neutral-chip-label { font-family: monospace; font-size: 0.55rem; background: rgba(255,255,255,0.8); border-radius: 3px; padding: 1px 4px; color: var(--color-neutral-600); }
    .neutral-chip.is-dark .neutral-chip-label { background: rgba(0,0,0,0.3); color: var(--color-neutral-100); }

    .type-specimen { padding: 24px; background: var(--color-white); border: var(--border); border-radius: var(--radius); margin-bottom: 16px; }
    .font-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-neutral-400); margin-bottom: 12px; font-family: var(--font-body); }

    .token-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .token-demo { background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px; padding: 20px; display: flex; align-items: center; gap: 16px; flex: 1; min-width: 200px; }
    .token-demo-label { font-size: 0.75rem; font-weight: 600; color: var(--color-neutral-700); }
    .token-demo-value { font-size: 0.7rem; font-family: monospace; color: var(--color-neutral-400); }

    .component-stage { background: var(--color-white); border: 1px solid var(--color-neutral-200); border-radius: 8px; padding: 32px; margin-bottom: 16px; }
    .component-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }

    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 20px; font-family: var(--font-body); font-size: 0.875rem; font-weight: 500; border: none; border-radius: var(--radius); cursor: pointer; text-transform: ${buttonTextTransform}; transition: all var(--transition-duration) var(--transition-easing); text-decoration: none; }
${isOutlineStyle ? `    .btn-primary { background: transparent; color: var(--color-primary); border: ${outlineBorderWidth}px solid var(--color-primary); }
    .btn-secondary { background: transparent; color: var(--color-secondary); border: ${outlineBorderWidth}px solid var(--color-secondary); }` : `    .btn-primary { background: var(--color-primary); color: var(--color-white); }
    .btn-secondary { background: var(--color-secondary); color: var(--color-white); }`}
    .btn-outline { background: transparent; color: var(--color-neutral-700); border: var(--border); }
${config.buttonHoverStyle === 'darker' ? `    .btn-primary:hover { background: ${shade(config.primaryColor, 0.15)};${isOutlineStyle ? ` color: var(--color-white); border-color: ${shade(config.primaryColor, 0.15)};` : ''} }
    .btn-secondary:hover { background: ${shade(config.secondaryColor, 0.15)};${isOutlineStyle ? ` color: var(--color-white); border-color: ${shade(config.secondaryColor, 0.15)};` : ''} }
    .btn-outline:hover { background: var(--color-neutral-100); }` : ''}${config.buttonHoverStyle === 'lighter' ? `    .btn-primary:hover { background: ${tint(config.primaryColor, 0.2)};${isOutlineStyle ? ` color: var(--color-white); border-color: ${tint(config.primaryColor, 0.2)};` : ''} }
    .btn-secondary:hover { background: ${tint(config.secondaryColor, 0.2)};${isOutlineStyle ? ` color: var(--color-white); border-color: ${tint(config.secondaryColor, 0.2)};` : ''} }
    .btn-outline:hover { background: var(--color-neutral-50); }` : ''}${config.buttonHoverStyle === 'glow' ? `    .btn-primary:hover {${isOutlineStyle ? ` background: var(--color-primary); color: var(--color-white); border-color: var(--color-primary);` : ''} box-shadow: 0 0 0 4px ${tint(config.primaryColor, 0.65)}; }
    .btn-secondary:hover {${isOutlineStyle ? ` background: var(--color-secondary); color: var(--color-white); border-color: var(--color-secondary);` : ''} box-shadow: 0 0 0 4px ${tint(config.secondaryColor, 0.65)}; }
    .btn-outline:hover { box-shadow: 0 0 0 4px ${n[200]}; }` : ''}${config.buttonHoverStyle === 'lift' ? `${isOutlineStyle ? `    .btn-primary:hover { background: var(--color-primary); color: var(--color-white); border-color: var(--color-primary); }
    .btn-secondary:hover { background: var(--color-secondary); color: var(--color-white); border-color: var(--color-secondary); }
` : ''}    .btn-primary:hover, .btn-secondary:hover, .btn-outline:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }` : ''}
    a { color: var(--link-color); text-decoration: var(--link-decoration); text-underline-offset: 2px; transition: color var(--transition-duration) var(--transition-easing); }
    a:hover { color: var(--link-hover-color); text-decoration: var(--link-hover-decoration); }
    .btn-text { background: transparent; color: var(--link-color); padding: 10px 8px; text-decoration: var(--link-decoration); text-underline-offset: 2px; }
    .btn-text:hover { color: var(--link-hover-color); text-decoration: var(--link-hover-decoration); }
    .btn-disabled { background: var(--color-neutral-200); color: var(--color-neutral-400); cursor: not-allowed; }
    .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
    .btn-lg { padding: 14px 28px; font-size: 1rem; }

    .card { background: var(--color-white); border: var(--border); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
    .card-body { padding: 20px; }
    .card-title { font-family: var(--font-heading); font-size: 1.1rem; font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-900); margin-bottom: 6px; }
    .card-text { color: var(--color-neutral-600); font-size: 0.875rem; line-height: 1.5; }
    .card-image { width: 100%; height: 160px; background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 30%, white), color-mix(in srgb, var(--color-secondary) 30%, white)); }
    .card-actions { padding: 12px 20px; border-top: var(--border); display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }

    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--color-neutral-700); margin-bottom: 6px; }
    .form-input, .form-select, .form-textarea { width: 100%; padding: 10px 12px; font-family: var(--font-body); font-size: 0.875rem; color: var(--color-neutral-800); background: var(--color-white); border: var(--border); border-radius: var(--radius); transition: border-color var(--transition-duration) var(--transition-easing), box-shadow var(--transition-duration) var(--transition-easing); outline: none; }
    .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent); }
    .form-input::placeholder { color: var(--color-neutral-400); }
    .form-textarea { resize: vertical; min-height: 80px; }
    .form-hint { font-size: 0.75rem; color: var(--color-neutral-400); margin-top: 4px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .badge { display: inline-flex; align-items: center; padding: 3px 10px; font-size: 0.75rem; font-weight: 600; border-radius: 9999px; line-height: 1.4; }
    .badge-success { background: #f0fdf4; color: #166534; }
    .badge-warning { background: #fffbeb; color: #92400e; }
    .badge-danger { background: #fef2f2; color: #991b1b; }

    .alert { padding: 14px 18px; border-radius: var(--radius); font-size: 0.875rem; line-height: 1.5; border-left: 4px solid; }
    .alert-success { background: #f0fdf4; border-color: #22c55e; color: #166534; }
    .alert-warning { background: #fffbeb; border-color: #f59e0b; color: #92400e; }
    .alert-danger { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
    .alert-title { font-weight: 700; margin-bottom: 2px; }

    .table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    .table th { text-align: left; padding: 10px 16px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-neutral-500); background: var(--color-neutral-50); border-bottom: 1px solid var(--color-neutral-300); }
    .table td { padding: 12px 16px; color: var(--color-neutral-700); border-bottom: 1px solid var(--color-neutral-100); }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: var(--color-neutral-50); }
  </style>
</head>
<body>
  <div class="guide">
    <header class="guide-header">
      <h1>${config.name || 'Style Guide'}</h1>
      <p>Design tokens and component reference. Generated by Style Guide Configurator.</p>
    </header>

    <!-- Colors -->
    <section class="section">
      <h2 class="section-title">Color Palette</h2>
      <p class="section-desc">One primary, one secondary, one neutral family. Generate tints and shades as needed from the primary and secondary hex values.</p>
      <div class="subsection">
        <h3 class="subsection-title">Primary &amp; Secondary</h3>
        <div class="color-cards">
          <div class="color-card">
            <div class="color-card-swatch" style="background: var(--color-primary);"></div>
            <div class="color-card-info">
              <div class="color-card-name">Primary</div>
              <div class="color-card-hex">--color-primary · ${config.primaryColor}</div>
            </div>
          </div>
          <div class="color-card">
            <div class="color-card-swatch" style="background: var(--color-secondary);"></div>
            <div class="color-card-info">
              <div class="color-card-name">Secondary</div>
              <div class="color-card-hex">--color-secondary · ${config.secondaryColor}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="subsection">
        <h3 class="subsection-title">Neutrals — ${neutralLabel}</h3>
        <div class="neutral-strip">
          ${Object.entries(n)
              .map(
                  ([step, hex]) =>
                      `<div class="neutral-chip${Number(step) >= 400 ? ' is-dark' : ''}" style="background: ${hex};"><span class="neutral-chip-label">${step}</span></div>`,
              )
              .join('\n          ')}
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="section">
      <h2 class="section-title">Typography</h2>
      <p class="section-desc">Heading font: <code>var(--font-heading)</code> — Body font: <code>var(--font-body)</code></p>
      <div class="subsection">
        <h3 class="subsection-title">Headings</h3>
        <div class="type-specimen">
          <h1 style="font-family: var(--font-heading); font-size: var(--font-size-h1); font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-900); line-height: 1.2; margin-bottom: 12px;">Heading One</h1>
          <h2 style="font-family: var(--font-heading); font-size: var(--font-size-h2); font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-900); line-height: 1.25; margin-bottom: 12px;">Heading Two</h2>
          <h3 style="font-family: var(--font-heading); font-size: var(--font-size-h3); font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-900); line-height: 1.3; margin-bottom: 12px;">Heading Three</h3>
          <h4 style="font-family: var(--font-heading); font-size: var(--font-size-secondary); font-weight: var(--font-weight-heading); letter-spacing: var(--letter-spacing-heading); text-transform: ${headingTextTransform}; color: var(--color-neutral-800); line-height: 1.35;">Heading Four</h4>
        </div>
      </div>
      <div class="subsection">
        <h3 class="subsection-title">Body Text &amp; Links</h3>
        <div class="type-specimen">
          <p style="font-family: var(--font-body); font-size: var(--font-size-body); font-weight: var(--font-weight-body); color: var(--color-neutral-700); line-height: var(--line-height-body); margin-bottom: 16px;">
            This is a standard paragraph. Body text uses the <code style="background: var(--color-neutral-100); padding: 1px 5px; border-radius: 3px; font-size: var(--font-size-small);">--font-body</code> family at a comfortable reading size.
          </p>
          <p style="font-family: var(--font-body); font-size: var(--font-size-secondary); font-weight: var(--font-weight-body); color: var(--color-neutral-500); line-height: 1.5; margin-bottom: 16px;">
            This is smaller secondary text, useful for captions, metadata, and supporting content.
          </p>
          <p style="font-family: var(--font-body); font-size: var(--font-size-body); font-weight: var(--font-weight-body); color: var(--color-neutral-700); line-height: var(--line-height-body);">
            Links look like <a href="#">this when inline</a> in body text.
          </p>
        </div>
      </div>
    </section>

    <!-- Borders, Radius & Shadows -->
    <section class="section">
      <h2 class="section-title">Borders, Radius &amp; Shadows</h2>
      <p class="section-desc">One value each. These apply to all components consistently.</p>
      <div class="token-row">
        <div class="token-demo">
          <div style="width: 64px; height: 40px; border: var(--border); border-radius: var(--radius);"></div>
          <div>
            <div class="token-demo-label">Border</div>
            <div class="token-demo-value">--border · ${config.borderWidth === 0 ? 'transparent (0px)' : `${config.borderWidth}px solid neutral-200`}</div>
          </div>
        </div>
        <div class="token-demo">
          <div style="width: 40px; height: 40px; background: var(--color-primary); border-radius: var(--radius);"></div>
          <div>
            <div class="token-demo-label">Radius</div>
            <div class="token-demo-value">--radius · ${config.radius}px</div>
          </div>
        </div>
        <div class="token-demo">
          <div style="width: 64px; height: 40px; background: var(--color-white); border-radius: var(--radius); box-shadow: var(--shadow);"></div>
          <div>
            <div class="token-demo-label">Shadow</div>
            <div class="token-demo-value">--shadow · ${config.shadowEnabled ? 'subtle elevation' : 'none'}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Components -->
    <section class="section">
      <h2 class="section-title">Components</h2>
      <p class="section-desc">Reference implementations showing how tokens combine.</p>

      <div class="subsection">
        <h3 class="subsection-title">Buttons</h3>
        <div class="component-stage">
          <div class="component-row" style="margin-bottom: 16px;">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-outline">Outline</button>
            <button class="btn btn-text">Text link</button>
            <button class="btn btn-disabled" disabled>Disabled</button>
          </div>
          <div class="component-row">
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary">Default</button>
            <button class="btn btn-primary btn-lg">Large</button>
          </div>
        </div>
      </div>

      <div class="subsection">
        <h3 class="subsection-title">Cards</h3>
        <div class="card-grid">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Basic Card</h3>
              <p class="card-text">A simple card with a title and body text.</p>
            </div>
          </div>
          <div class="card">
            <div class="card-image"></div>
            <div class="card-body">
              <h3 class="card-title">Card with Image</h3>
              <p class="card-text">A card with a header image area.</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card with Actions</h3>
              <p class="card-text">A card with footer actions.</p>
            </div>
            <div class="card-actions">
              <button class="btn btn-text btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm">Confirm</button>
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <h3 class="subsection-title">Form Fields</h3>
        <div class="component-stage" style="max-width: 480px;">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <input type="text" class="form-input" placeholder="Jane">
            </div>
            <div class="form-group">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-input" placeholder="Doe">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" placeholder="jane@example.com">
            <div class="form-hint">We'll never share your email.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-select">
              <option>Select an option…</option>
              <option>Option A</option>
              <option>Option B</option>
            </select>
          </div>
          <button class="btn btn-primary" style="width: 100%;">Submit</button>
        </div>
      </div>

      <div class="subsection">
        <h3 class="subsection-title">Badges &amp; Alerts</h3>
        <div class="component-stage" style="margin-bottom: 16px;">
          <div class="component-row">
            <span class="badge badge-success">Success</span>
            <span class="badge badge-warning">Warning</span>
            <span class="badge badge-danger">Danger</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div class="alert alert-success"><div class="alert-title">Success</div>Your changes have been saved.</div>
          <div class="alert alert-warning"><div class="alert-title">Warning</div>Your trial expires in 3 days.</div>
          <div class="alert alert-danger"><div class="alert-title">Error</div>Something went wrong. Please try again.</div>
        </div>
      </div>

      <div class="subsection">
        <h3 class="subsection-title">Table</h3>
        <div class="component-stage" style="padding: 0; overflow: hidden;">
          <table class="table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td style="font-weight: 500; color: var(--color-neutral-900);">Alice Chen</td><td>Engineer</td><td><span class="badge badge-success">Active</span></td></tr>
              <tr><td style="font-weight: 500; color: var(--color-neutral-900);">Bob Rivera</td><td>Designer</td><td><span class="badge badge-warning">Review</span></td></tr>
              <tr><td style="font-weight: 500; color: var(--color-neutral-900);">Cara Okafor</td><td>PM</td><td><span class="badge badge-danger">Inactive</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
  <!-- Generated by Style Guide Configurator -->
  <!-- Icon library: ${iconLabel} -->
</body>
</html>`;
}
