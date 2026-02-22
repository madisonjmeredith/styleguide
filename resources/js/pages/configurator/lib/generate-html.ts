import { BODY_LINE_HEIGHT_VALUES, HEADING_LETTER_SPACING_VALUES, ICON_LIBRARIES, NEUTRAL_PRESETS, TYPE_SCALE_OPTIONS, TYPE_SCALE_SIZES, googleFontsUrl, lookupFontMeta, shade, tint } from '../data';
import type { StyleGuideConfig } from '@/types';

const MATERIAL_SYMBOL_PATHS: Record<string, string> = {
    'check-circle': 'm421-389-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635-603L421-389Zm59 309q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z',
    'warning-triangle': 'M92-120q-9 0-15.65-4.13Q69.7-128.25 66-135q-4.17-6.6-4.58-14.3Q61-157 66-165l388-670q5-8 11.5-11.5T480-850q8 0 14.5 3.5T506-835l388 670q5 8 4.58 15.7-.41 7.7-4.58 14.3-3.7 6.75-10.35 10.87Q877-120 868-120H92Zm392.18-117q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5Zm0-111q12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-164q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v164q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63Z',
    'x-circle': 'm480-438 129 129q9 9 21 9t21-9q9-9 9-21t-9-21L522-480l129-129q9-9 9-21t-9-21q-9-9-21-9t-21 9L480-522 351-651q-9-9-21-9t-21 9q-9 9-9 21t9 21l129 129-129 129q-9 9-9 21t9 21q9 9 21 9t21-9l129-129Zm0 358q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z',
    'info-circle': 'M483.18-280q12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63Zm-3.2-314q14.02 0 23.52-9.2T513-626q0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2Zm.29 514q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Z',
    'plus': 'M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z',
};

const HEROICON_ALERT_PATHS: Record<string, string> = {
    success: '<path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />',
    warning: '<path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />',
    error: '<path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />',
};

const HEROICON_INFO_PATH = '<path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />';

const HEROICON_PLUS_PATH = '<path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />';

const CHEVRON_RIGHT_PATH = '<path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />';

function alertIconSvg(alertKey: string, color: string, iconLibrary: string): string {
    if (iconLibrary === 'material-symbols') {
        const pathKey = alertKey === 'success' ? 'check-circle' : alertKey === 'warning' ? 'warning-triangle' : 'x-circle';
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" fill="${color}"><path d="${MATERIAL_SYMBOL_PATHS[pathKey] ?? ''}"/></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="${color}">${HEROICON_ALERT_PATHS[alertKey] ?? ''}</svg>`;
}

function infoIconSvg(color: string, iconLibrary: string): string {
    if (iconLibrary === 'material-symbols') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="${color}"><path d="${MATERIAL_SYMBOL_PATHS['info-circle'] ?? ''}"/></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="${color}">${HEROICON_INFO_PATH}</svg>`;
}

function plusIconSvg(color: string, iconLibrary: string): string {
    if (iconLibrary === 'material-symbols') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" fill="${color}"><path d="${MATERIAL_SYMBOL_PATHS['plus'] ?? ''}"/></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="${color}">${HEROICON_PLUS_PATH}</svg>`;
}

export function generateHTML(config: StyleGuideConfig): string {
    const n = NEUTRAL_PRESETS[config.neutralFamily].values;
    const hfMeta = lookupFontMeta(config.headingFont, config.headingFontMeta);
    const bfMeta = lookupFontMeta(config.bodyFont, config.bodyFontMeta);
    const fontsUrl = googleFontsUrl([
        { name: config.headingFont, weights: hfMeta.weights },
        { name: config.bodyFont, weights: bfMeta.weights },
    ]);
    const neutralLabel = NEUTRAL_PRESETS[config.neutralFamily].label;
    const border = config.borderWidth === 0 ? '1px solid transparent' : `${config.borderWidth}px solid ${n[200]}`;
    const shadow = config.shadowEnabled
        ? '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05)'
        : 'none';
    const modalShadow = config.shadowEnabled
        ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
        : 'none';
    const iconLabel = ICON_LIBRARIES.find((l) => l.id === config.iconLibrary)?.label || 'Heroicons';
    const ts = TYPE_SCALE_SIZES[config.typeScale ?? 'regular'];
    const typeScaleLabel = TYPE_SCALE_OPTIONS.find((o) => o.id === (config.typeScale ?? 'regular'))?.label ?? 'Regular';
    const hfFallback = hfMeta.category === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';
    const bfFallback = bfMeta.category === 'sans-serif' ? 'system-ui, sans-serif' : 'Georgia, serif';
    const headingFont = `'${config.headingFont}', ${hfFallback}`;
    const bodyFont = `'${config.bodyFont}', ${bfFallback}`;

    const headingFontWeight = config.headingFontWeight ?? 700;
    const bodyFontWeight = config.bodyFontWeight ?? 400;
    const headingLetterSpacing = HEADING_LETTER_SPACING_VALUES[config.headingLetterSpacing ?? 'normal'];
    const bodyLineHeight = BODY_LINE_HEIGHT_VALUES[config.bodyLineHeight ?? 'comfortable'];
    const headingTextTransform = config.headingTextTransform ?? 'none';
    const buttonTextTransform = config.buttonTextTransform ?? 'none';
    const buttonLetterSpacing = buttonTextTransform === 'uppercase' ? '0.05em' : 'normal';

    const isOutlineStyle = (config.buttonStyle ?? 'filled') === 'outline';
    const outlineBorderWidth = Math.max(config.borderWidth, 1);

    const primary = config.primaryColor;
    const secondary = config.secondaryColor;

    const linkColor = config.linkColor === 'secondary' ? secondary : primary;
    const linkHoverColor =
        config.linkHoverColor === 'darker' ? shade(linkColor, 0.25) : config.linkHoverColor === 'lighter' ? tint(linkColor, 0.3) : linkColor;
    const linkUnderline = config.linkUnderline !== false;
    const linkHoverUnderline = config.linkUnderlineOnHover ?? 'none';

    const allNeutralComments = Object.entries(NEUTRAL_PRESETS)
        .map(([, preset]) => `           ${preset.label.padEnd(14)} ${Object.values(preset.values).join(' ')}`)
        .join('\n');

    const btnPrimaryBg = isOutlineStyle ? 'transparent' : primary;
    const btnPrimaryColor = isOutlineStyle ? primary : '#fff';
    const btnPrimaryBorder = isOutlineStyle ? `${outlineBorderWidth}px solid ${primary}` : 'none';
    const btnSecondaryBg = isOutlineStyle ? 'transparent' : secondary;
    const btnSecondaryColor = isOutlineStyle ? secondary : '#fff';
    const btnSecondaryBorder = isOutlineStyle ? `${outlineBorderWidth}px solid ${secondary}` : 'none';

    let buttonHoverCSS = '';
    if (config.buttonHoverStyle === 'fill' && isOutlineStyle) {
        buttonHoverCSS = `
        .btn-primary:hover { background: ${primary}; color: #fff; border-color: ${primary}; }
        .btn-secondary:hover { background: ${secondary}; color: #fff; border-color: ${secondary}; }`;
    } else if (config.buttonHoverStyle === 'darker') {
        buttonHoverCSS = `
        .btn-primary:hover { background: ${shade(primary, 0.15)};${isOutlineStyle ? ` color: #fff; border-color: ${shade(primary, 0.15)};` : ''} }
        .btn-secondary:hover { background: ${shade(secondary, 0.15)};${isOutlineStyle ? ` color: #fff; border-color: ${shade(secondary, 0.15)};` : ''} }`;
    } else if (config.buttonHoverStyle === 'lighter') {
        buttonHoverCSS = `
        .btn-primary:hover { background: ${tint(primary, 0.2)};${isOutlineStyle ? ` color: #fff; border-color: ${tint(primary, 0.2)};` : ''} }
        .btn-secondary:hover { background: ${tint(secondary, 0.2)};${isOutlineStyle ? ` color: #fff; border-color: ${tint(secondary, 0.2)};` : ''} }`;
    } else if (config.buttonHoverStyle === 'glow') {
        buttonHoverCSS = `
        .btn-primary:hover {${isOutlineStyle ? ` background: ${primary}; color: #fff; border-color: ${primary};` : ''} box-shadow: 0 0 0 4px ${tint(primary, 0.65)}; }
        .btn-secondary:hover {${isOutlineStyle ? ` background: ${secondary}; color: #fff; border-color: ${secondary};` : ''} box-shadow: 0 0 0 4px ${tint(secondary, 0.65)}; }`;
    } else if (config.buttonHoverStyle === 'lift') {
        buttonHoverCSS = `${isOutlineStyle ? `
        .btn-primary:hover { background: ${primary}; color: #fff; border-color: ${primary}; }
        .btn-secondary:hover { background: ${secondary}; color: #fff; border-color: ${secondary}; }` : ''}
        .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }`;
    }

    const products = [
        { name: 'Basic Tee', price: '$35', color: 'Black', badge: 'New' },
        { name: 'Basic Tee', price: '$35', color: 'Aspen White', badge: '' },
        { name: 'Basic Tee', price: '$35', color: 'Charcoal', badge: '' },
        { name: 'Artwork Tee', price: '$35', color: 'Iso Dots', badge: '' },
    ];

    const tableRows = [
        { name: 'Maya Johnson', title: 'Software Engineer', email: 'maya.johnson@example.com', role: 'Admin' },
        { name: 'James Park', title: 'Product Manager', email: 'james.park@example.com', role: 'Member' },
        { name: 'Sara Nilsson', title: 'UX Designer', email: 'sara.nilsson@example.com', role: 'Member' },
        { name: 'David Chen', title: 'Data Analyst', email: 'david.chen@example.com', role: 'Owner' },
    ];

    const alerts = [
        { key: 'success', title: 'Changes saved', description: 'Your changes have been saved successfully.', bg: '#f0fdf4', iconColor: '#4ade80', titleColor: '#166534', bodyColor: '#15803d' },
        { key: 'warning', title: 'Attention needed', description: 'Your trial is expiring in 3 days.', bg: '#fefce8', iconColor: '#facc15', titleColor: '#854d0e', bodyColor: '#a16207' },
        { key: 'error', title: 'Something went wrong', description: 'There was a problem processing your request.', bg: '#fef2f2', iconColor: '#f87171', titleColor: '#991b1b', bodyColor: '#b91c1c' },
    ];

    const paginationItems = [
        { type: 'prev' },
        { type: 'page', value: 1, active: true },
        { type: 'page', value: 2 },
        { type: 'page', value: 3 },
        { type: 'ellipsis' },
        { type: 'page', value: 8 },
        { type: 'page', value: 9 },
        { type: 'page', value: 10 },
        { type: 'next' },
    ];

    const chevronLeft = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" /></svg>';
    const chevronRight = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>';

    const paginationHTML = paginationItems.map((item, i, arr) => {
        const isFirst = i === 0;
        const isLast = i === arr.length - 1;
        const radiusTL = isFirst ? `${config.radius}px` : '0';
        const radiusBL = isFirst ? `${config.radius}px` : '0';
        const radiusTR = isLast ? `${config.radius}px` : '0';
        const radiusBR = isLast ? `${config.radius}px` : '0';
        const baseStyle = `position: relative; display: inline-flex; align-items: center; justify-content: center; font-size: ${ts.small}px; font-weight: 600; font-family: ${bodyFont}; margin-left: ${i > 0 ? '-1px' : '0'}; box-shadow: inset 0 0 0 1px ${n[300]}; border-top-left-radius: ${radiusTL}; border-bottom-left-radius: ${radiusBL}; border-top-right-radius: ${radiusTR}; border-bottom-right-radius: ${radiusBR}; text-decoration: none;`;

        if (item.type === 'prev' || item.type === 'next') {
            return `<a href="#" style="${baseStyle} padding: 8px; color: ${n[400]};">${item.type === 'prev' ? chevronLeft : chevronRight}</a>`;
        }
        if (item.type === 'ellipsis') {
            return `<span style="${baseStyle} padding: 8px 14px; color: ${n[500]}; cursor: default;">&hellip;</span>`;
        }
        const isActive = 'active' in item && item.active;
        if (isActive) {
            return `<a href="#" style="${baseStyle} padding: 8px 14px; z-index: 10; background: ${primary}; color: #fff; box-shadow: none;">1</a>`;
        }
        return `<a href="#" style="${baseStyle} padding: 8px 14px; color: ${n[900]};">${(item as { value: number }).value}</a>`;
    }).join('\n            ');

    const productCardsHTML = products.map((product) => {
        const badgeHTML = product.badge
            ? `<span style="position: absolute; top: 8px; left: 8px; display: inline-flex; align-items: center; padding: 2px 8px; font-size: ${ts.small - 1}px; font-weight: 500; font-family: ${bodyFont}; border-radius: ${config.radius}px; background: ${tint(primary, 0.85)}; color: ${primary};">${product.badge}</span>`
            : '';
        return `<div>
                <div style="position: relative;">
                  <div style="aspect-ratio: 1 / 1; width: 100%; border-radius: ${config.radius}px; background: ${n[200]};"></div>
                  ${badgeHTML}
                </div>
                <div style="margin-top: 12px; display: flex; justify-content: space-between;">
                  <div>
                    <h3 style="font-size: ${ts.small}px; font-family: ${bodyFont}; color: ${n[700]}; margin: 0;">${product.name}</h3>
                    <p style="margin-top: 2px; font-size: ${ts.small}px; font-family: ${bodyFont}; color: ${n[500]}; margin: 0;">${product.color}</p>
                  </div>
                  <p style="font-size: ${ts.small}px; font-weight: 500; font-family: ${bodyFont}; color: ${n[900]}; margin: 0;">${product.price}</p>
                </div>
              </div>`;
    }).join('\n              ');

    const tableRowsHTML = tableRows.map((person, i) => {
        const borderBottom = i < tableRows.length - 1 ? `border-bottom: 1px solid ${n[200]};` : '';
        return `<tr>
                <td style="padding: 14px 12px; font-weight: 500; color: ${n[900]}; white-space: nowrap; ${borderBottom}">${person.name}</td>
                <td style="padding: 14px 12px; color: ${n[500]}; white-space: nowrap; ${borderBottom}">${person.title}</td>
                <td style="padding: 14px 12px; color: ${n[500]}; white-space: nowrap; ${borderBottom}">${person.email}</td>
                <td style="padding: 14px 12px; color: ${n[500]}; white-space: nowrap; ${borderBottom}">${person.role}</td>
                <td style="padding: 14px 12px; text-align: right; white-space: nowrap; ${borderBottom}"><a href="#" class="link" style="font-weight: 500;">Edit</a></td>
              </tr>`;
    }).join('\n              ');

    const alertsHTML = alerts.map((alert) => {
        return `<div style="border-radius: ${config.radius}px; background: ${alert.bg}; padding: 16px;">
              <div style="display: flex;">
                <div style="flex-shrink: 0; display: flex; align-items: flex-start; padding-top: 1px;">
                  ${alertIconSvg(alert.key, alert.iconColor, config.iconLibrary)}
                </div>
                <div style="margin-left: 12px;">
                  <h3 style="font-size: ${ts.small}px; font-weight: 500; font-family: ${bodyFont}; color: ${alert.titleColor}; line-height: 1.25; margin: 0;">${alert.title}</h3>
                  <div style="margin-top: 4px; font-size: ${ts.small}px; font-family: ${bodyFont}; color: ${alert.bodyColor}; line-height: 1.5;">${alert.description}</div>
                </div>
              </div>
            </div>`;
    }).join('\n            ');

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
    /*
     * Design Tokens
     *
     * Primary:   ${primary}
     * Secondary: ${secondary}
     *
     * Neutral Family: ${neutralLabel}
${allNeutralComments}
     *
     * Heading Font: ${config.headingFont} (weight: ${headingFontWeight}, letter-spacing: ${headingLetterSpacing}, transform: ${headingTextTransform})
     * Body Font:    ${config.bodyFont} (weight: ${bodyFontWeight}, line-height: ${bodyLineHeight})
     *
     * Type Scale: ${typeScaleLabel} — h1: ${ts.h1}px, h2: ${ts.h2}px, h3: ${ts.h3}px, body: ${ts.body}px, secondary: ${ts.secondary}px, small: ${ts.small}px
     *
     * Border:     ${config.borderWidth === 0 ? 'transparent (0px)' : `${config.borderWidth}px solid neutral-200`}
     * Radius:     ${config.radius}px
     * Shadow:     ${config.shadowEnabled ? 'subtle elevation' : 'none'}
     * Transition: ${config.transitionDuration}ms ease
     *
     * Button Style: ${config.buttonStyle ?? 'filled'} — Hover: ${config.buttonHoverStyle} — Transform: ${buttonTextTransform}
     * Link Color: ${config.linkColor} — Hover: ${config.linkHoverColor} — Underline: ${config.linkUnderline} — Hover Underline: ${linkHoverUnderline}
     * Icon Library: ${iconLabel}
     */

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: ${bodyFont};
      font-size: ${ts.body}px;
      font-weight: ${bodyFontWeight};
      color: ${n[800]};
      background: ${n[100]};
      line-height: ${bodyLineHeight};
      -webkit-font-smoothing: antialiased;
    }

    .guide-wrapper {
      padding: 20px;
    }

    .guide-card {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    .guide-content {
      font-family: ${bodyFont};
      color: ${n[800]};
      background: ${n[50]};
      padding: 32px;
    }

    .section { margin-bottom: 32px; }
    .section:last-child { margin-bottom: 0; }

    .section-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: ${n[400]};
      margin-bottom: 10px;
      font-family: ${bodyFont};
    }

    .panel {
      background: #fff;
      border: ${border};
      border-radius: ${config.radius}px;
      padding: 20px;
    }

    .link {
      color: ${linkColor};
      text-decoration: ${linkUnderline ? 'underline' : 'none'};
      text-underline-offset: 2px;
      transition: color ${config.transitionDuration}ms ease, text-decoration-color ${config.transitionDuration}ms ease;
    }
    .link:hover {
      color: ${linkHoverColor};
      ${linkHoverUnderline === 'show' ? 'text-decoration: underline; text-underline-offset: 2px;' : linkHoverUnderline === 'remove' ? 'text-decoration: none;' : ''}
    }

    .breadcrumb-link {
      color: ${n[500]};
      text-decoration: ${linkUnderline ? 'underline' : 'none'};
      text-underline-offset: 2px;
      transition: color ${config.transitionDuration}ms ease;
    }
    .breadcrumb-link:hover {
      color: ${n[700]};
      ${linkHoverUnderline === 'show' ? 'text-decoration: underline; text-underline-offset: 2px;' : linkHoverUnderline === 'remove' ? 'text-decoration: none;' : ''}
    }

    .btn {
      transition: all ${config.transitionDuration}ms ease;
      cursor: pointer;
      font-family: ${bodyFont};
    }
    .btn-primary { background: ${btnPrimaryBg}; color: ${btnPrimaryColor}; border: ${btnPrimaryBorder}; box-shadow: ${shadow}; }
    .btn-secondary { background: ${btnSecondaryBg}; color: ${btnSecondaryColor}; border: ${btnSecondaryBorder}; box-shadow: ${shadow}; }
    ${buttonHoverCSS}
  </style>
</head>
<body>
  <div class="guide-wrapper">
    <div class="guide-card">
      <div class="guide-content">

        ${config.name ? `<!-- Name -->
        <h1 style="font-family: ${headingFont}; font-size: ${ts.h1 + 8}px; font-weight: ${headingFontWeight}; color: ${n[900]}; line-height: 1.2; letter-spacing: ${headingLetterSpacing}; margin-bottom: 24px;">${config.name}</h1>` : ''}

        <!-- Typography -->
        <div class="section">
          <div class="section-label">Typography</div>
          <div class="panel">
            <h1 style="font-family: ${headingFont}; font-size: ${ts.h1}px; font-weight: ${headingFontWeight}; color: ${n[900]}; line-height: 1.2; letter-spacing: ${headingLetterSpacing}; text-transform: ${headingTextTransform}; margin-bottom: 4px;">Heading One</h1>
            <h2 style="font-family: ${headingFont}; font-size: ${ts.h2}px; font-weight: ${headingFontWeight}; color: ${n[900]}; line-height: 1.25; letter-spacing: ${headingLetterSpacing}; text-transform: ${headingTextTransform}; margin-bottom: 4px;">Heading Two</h2>
            <h3 style="font-family: ${headingFont}; font-size: ${ts.h3}px; font-weight: ${headingFontWeight}; color: ${n[900]}; line-height: 1.3; letter-spacing: ${headingLetterSpacing}; text-transform: ${headingTextTransform}; margin-bottom: 12px;">Heading Three</h3>
            <p style="font-size: ${ts.body}px; font-weight: ${bodyFontWeight}; color: ${n[700]}; line-height: ${bodyLineHeight}; margin-bottom: 8px;">This is body text using the selected body font. It demonstrates comfortable reading size, generous line height, and softened color.</p>
            <p style="font-size: ${ts.secondary}px; font-weight: ${bodyFontWeight}; color: ${n[500]}; line-height: 1.5; margin-bottom: 8px;">This is secondary text — smaller and lighter for captions and metadata.</p>
            <p style="font-size: ${ts.body}px; font-weight: ${bodyFontWeight}; color: ${n[700]};">Links look <a href="#" class="link">like this</a> inline.</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="section">
          <div class="section-label">Buttons</div>
          <div class="panel" style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <button class="btn btn-primary" style="padding: 9px 18px; font-size: ${ts.secondary}px; font-weight: 500; border-radius: ${config.radius}px; text-transform: ${buttonTextTransform}; letter-spacing: ${buttonLetterSpacing};">Primary</button>
            <button class="btn btn-secondary" style="padding: 9px 18px; font-size: ${ts.secondary}px; font-weight: 500; border-radius: ${config.radius}px; text-transform: ${buttonTextTransform}; letter-spacing: ${buttonLetterSpacing};">Secondary</button>
            <button class="btn btn-primary" style="padding: 8px; border-radius: 9999px; display: inline-flex; align-items: center; justify-content: center;">${plusIconSvg('currentColor', config.iconLibrary)}</button>
            <button class="link" style="padding: 9px 8px; font-size: ${ts.secondary}px; font-weight: 500; font-family: ${bodyFont}; background: transparent; border: none; border-radius: ${config.radius}px; text-transform: ${buttonTextTransform}; letter-spacing: ${buttonLetterSpacing}; cursor: pointer;">Text link</button>
            <button style="padding: 9px 18px; font-size: ${ts.secondary}px; font-weight: 500; font-family: ${bodyFont}; background: ${n[200]}; color: ${n[400]}; border: none; border-radius: ${config.radius}px; text-transform: ${buttonTextTransform}; cursor: not-allowed;">Disabled</button>
          </div>
        </div>

        <!-- Cards -->
        <div class="section">
          <div class="section-label">Cards</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px;">
            ${productCardsHTML}
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <nav style="display: inline-flex; border-radius: ${config.radius}px; box-shadow: ${shadow};">
              ${paginationHTML}
            </nav>
          </div>
        </div>

        <!-- Form -->
        <div class="section">
          <div class="section-label">Form</div>
          <div style="background: #fff; border: ${border}; border-radius: ${config.radius}px; box-shadow: ${shadow}; padding: 32px; max-width: 400px;">
            <form style="display: flex; flex-direction: column; gap: 20px;">
              <div>
                <label style="display: block; font-size: ${ts.small}px; font-weight: 500; color: ${n[900]}; margin-bottom: 6px;">Email address</label>
                <input type="email" style="width: 100%; padding: 8px 12px; font-size: ${ts.small}px; font-family: ${bodyFont}; color: ${n[800]}; background: #fff; border: ${border}; border-radius: ${config.radius}px; outline: none; box-sizing: border-box;">
              </div>
              <div>
                <label style="display: block; font-size: ${ts.small}px; font-weight: 500; color: ${n[900]}; margin-bottom: 6px;">Password</label>
                <input type="password" style="width: 100%; padding: 8px 12px; font-size: ${ts.small}px; font-family: ${bodyFont}; color: ${n[800]}; background: #fff; border: ${border}; border-radius: ${config.radius}px; outline: none; box-sizing: border-box;">
              </div>
              <button class="btn btn-primary" style="width: 100%; padding: 9px 18px; font-size: ${ts.small}px; font-weight: 600; border-radius: ${config.radius}px; text-transform: ${buttonTextTransform};">Sign in</button>
            </form>
            <p style="margin-top: 24px; text-align: center; font-size: ${ts.small}px; margin-bottom: 0;">
              <a href="#" class="link" style="font-weight: 600;">Start a 14 day free trial</a>
            </p>
          </div>
        </div>

        <!-- Modal -->
        <div class="section">
          <div class="section-label">Modal</div>
          <div style="background: #fff; border: ${border}; border-radius: ${config.radius}px; box-shadow: ${modalShadow}; padding: 24px; max-width: 480px;">
            <div style="display: flex; align-items: flex-start;">
              <div style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 9999px; background: ${tint(primary, 0.85)}; display: flex; align-items: center; justify-content: center;">
                ${infoIconSvg(primary, config.iconLibrary)}
              </div>
              <div style="margin-left: 16px; flex: 1;">
                <h3 style="font-size: ${ts.body}px; font-weight: 600; font-family: ${bodyFont}; color: ${n[900]}; margin: 0;">Publish changes</h3>
                <p style="margin-top: 8px; font-size: ${ts.small}px; font-family: ${bodyFont}; color: ${n[500]}; line-height: 1.5; margin-bottom: 0;">Your updates will be visible to all team members once published. You can review changes before they go live.</p>
              </div>
            </div>
            <div style="margin-top: 20px; display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
              <button class="link" style="padding: 6px 8px; font-size: ${ts.small}px; font-weight: 600; font-family: ${bodyFont}; background: transparent; border: none; cursor: pointer;">Cancel</button>
              <button class="btn btn-primary" style="padding: 8px 16px; font-size: ${ts.small}px; font-weight: 600; border-radius: ${config.radius}px; text-transform: ${buttonTextTransform};">Publish</button>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div class="section">
          <div class="section-label">Alerts</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${alertsHTML}
          </div>
        </div>

        <!-- Breadcrumbs -->
        <div class="section">
          <div class="section-label">Breadcrumbs</div>
          <nav style="display: flex;">
            <ol style="display: flex; align-items: center; gap: 16px; list-style: none; margin: 0; padding: 0;">
              <li>
                <a href="#" class="breadcrumb-link" style="font-size: ${ts.small}px; font-family: ${bodyFont}; font-weight: 500;">Home</a>
              </li>
              <li style="display: flex; align-items: center; gap: 16px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="${n[400]}" style="flex-shrink: 0;">${CHEVRON_RIGHT_PATH}</svg>
                <a href="#" class="breadcrumb-link" style="font-size: ${ts.small}px; font-family: ${bodyFont}; font-weight: 500;">Dashboard</a>
              </li>
              <li style="display: flex; align-items: center; gap: 16px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="${n[400]}" style="flex-shrink: 0;">${CHEVRON_RIGHT_PATH}</svg>
                <span style="font-size: ${ts.small}px; font-family: ${bodyFont}; font-weight: 500; color: ${n[700]};">Settings</span>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Table -->
        <div class="section">
          <div class="section-label">Table</div>
          <div style="background: #fff; border: ${border}; border-radius: ${config.radius}px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; font-size: ${ts.small}px;">
              <thead>
                <tr>
                  <th style="text-align: left; padding: 12px 12px; font-size: ${ts.small}px; font-weight: 600; color: ${n[900]}; background: ${n[50]}; border-bottom: 1px solid ${n[300]};">Name</th>
                  <th style="text-align: left; padding: 12px 12px; font-size: ${ts.small}px; font-weight: 600; color: ${n[900]}; background: ${n[50]}; border-bottom: 1px solid ${n[300]};">Title</th>
                  <th style="text-align: left; padding: 12px 12px; font-size: ${ts.small}px; font-weight: 600; color: ${n[900]}; background: ${n[50]}; border-bottom: 1px solid ${n[300]};">Email</th>
                  <th style="text-align: left; padding: 12px 12px; font-size: ${ts.small}px; font-weight: 600; color: ${n[900]}; background: ${n[50]}; border-bottom: 1px solid ${n[300]};">Role</th>
                  <th style="text-align: left; padding: 12px 12px; font-size: ${ts.small}px; font-weight: 600; color: ${n[900]}; background: ${n[50]}; border-bottom: 1px solid ${n[300]};"></th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHTML}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- Generated by Style Guide Configurator -->
  <!-- Icon library: ${iconLabel} -->
</body>
</html>`;
}
