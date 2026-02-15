import type { FontMeta, StyleGuideConfig, TypeScale } from '@/types';

export type GoogleFont = {
    family: string;
    category: string;
    variants: string[];
};

export const NEUTRAL_PRESETS = {
    cool: {
        label: 'Cool Gray',
        values: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },
    },
    neutral: {
        label: 'Neutral Gray',
        values: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
        },
    },
    warm: {
        label: 'Warm Gray',
        values: {
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
        },
    },
} as const;

export type NeutralPresetKey = keyof typeof NEUTRAL_PRESETS;

export const HEADING_FONTS = [
    { name: 'Fraunces', category: 'serif', weights: '400;700' },
    { name: 'Playfair Display', category: 'serif', weights: '400;700' },
    { name: 'DM Serif Display', category: 'serif', weights: '400' },
    { name: 'Libre Baskerville', category: 'serif', weights: '400;700' },
    { name: 'Lora', category: 'serif', weights: '400;700' },
    { name: 'Merriweather', category: 'serif', weights: '400;700' },
    { name: 'Bitter', category: 'serif', weights: '400;700' },
    { name: 'Plus Jakarta Sans', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Outfit', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Sora', category: 'sans-serif', weights: '400;600;700' },
] as const;

export const BODY_FONTS = [
    { name: 'DM Sans', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Plus Jakarta Sans', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Nunito', category: 'sans-serif', weights: '400;600;700' },
    { name: 'Source Sans 3', category: 'sans-serif', weights: '400;600;700' },
    { name: 'Lato', category: 'sans-serif', weights: '400;700' },
    { name: 'Work Sans', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Manrope', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Outfit', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Karla', category: 'sans-serif', weights: '400;500;700' },
    { name: 'Open Sans', category: 'sans-serif', weights: '400;600;700' },
] as const;

export const ICON_LIBRARIES = [
    { id: 'fontawesome' as const, label: 'Font Awesome', note: 'CSS classes · fa-solid fa-icon' },
    { id: 'fontawesome-outline' as const, label: 'Font Awesome Outline', note: 'CSS classes · fa-regular fa-icon' },
    { id: 'heroicons' as const, label: 'Heroicons', note: 'Inline SVGs · Tailwind team' },
    { id: 'feather' as const, label: 'Feather Icons', note: 'data-feather attr · lightweight' },
    { id: 'lucide' as const, label: 'Lucide', note: 'Inline SVGs · Fork of Feather' },
];

export const ICON_PREVIEW_SET = [
    { key: 'home', label: 'Home' },
    { key: 'search', label: 'Search' },
    { key: 'user', label: 'User' },
    { key: 'heart', label: 'Heart' },
    { key: 'settings', label: 'Settings' },
    { key: 'mail', label: 'Mail' },
    { key: 'bell', label: 'Bell' },
    { key: 'star', label: 'Star' },
    { key: 'plus', label: 'Plus' },
    { key: 'arrow-right', label: 'Arrow' },
    { key: 'check', label: 'Check' },
    { key: 'close', label: 'Close' },
] as const;

export const TYPE_SCALE_OPTIONS: Array<{ id: TypeScale; label: string; description: string }> = [
    { id: 'small', label: 'Small', description: 'Compact UI, dense layouts' },
    { id: 'regular', label: 'Regular', description: 'Balanced default' },
    { id: 'large', label: 'Large', description: 'Roomy, readable' },
    { id: 'extra-large', label: 'Extra Large', description: 'Bold, editorial feel' },
];

export type TypeScaleSizes = {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    secondary: number;
    small: number;
};

export const TYPE_SCALE_SIZES: Record<TypeScale, TypeScaleSizes> = {
    small: { h1: 28, h2: 22, h3: 18, body: 14, secondary: 13, small: 12 },
    regular: { h1: 32, h2: 25, h3: 20, body: 16, secondary: 14, small: 13 },
    large: { h1: 36, h2: 28, h3: 22, body: 18, secondary: 16, small: 14 },
    'extra-large': { h1: 42, h2: 32, h3: 25, body: 20, secondary: 18, small: 16 },
};

export const COLOR_PRESETS = [
    { label: 'Red', value: '#ef4444' },
    { label: 'Orange', value: '#fb923c' },
    { label: 'Amber', value: '#fcd34d' },
    { label: 'Yellow', value: '#fef08a' },
    { label: 'Lime', value: '#bef264' },
    { label: 'Green', value: '#16a34a' },
    { label: 'Emerald', value: '#34d399' },
    { label: 'Teal', value: '#14b8a6' },
    { label: 'Cyan', value: '#67e8f9' },
    { label: 'Sky', value: '#38bdf8' },
    { label: 'Blue', value: '#3b82f6' },
    { label: 'Indigo', value: '#4338ca' },
    { label: 'Violet', value: '#7c3aed' },
    { label: 'Purple', value: '#c084fc' },
    { label: 'Fuchsia', value: '#c026d3' },
    { label: 'Pink', value: '#f9a8d4' },
    { label: 'Rose', value: '#fecdd3' },
] as const;

export const BORDER_WIDTH_OPTIONS = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
];

export const RADIUS_OPTIONS = [
    { value: 0, label: '0' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
    { value: 16, label: '16' },
    { value: 32, label: '32' },
];

export const ALL_STATIC_FONTS = [
    ...HEADING_FONTS,
    ...BODY_FONTS.filter((bf) => !HEADING_FONTS.some((hf) => hf.name === bf.name)),
] as const;

export const DEFAULT_CONFIG: StyleGuideConfig = {
    primaryColor: '#4f46e5',
    secondaryColor: '#d946ef',
    neutralFamily: 'cool',
    headingFont: 'Fraunces',
    headingFontMeta: { category: 'serif', weights: '400;700' },
    bodyFont: 'DM Sans',
    bodyFontMeta: { category: 'sans-serif', weights: '400;500;700' },
    typeScale: 'regular',
    iconLibrary: 'heroicons',
    borderWidth: 1,
    shadowEnabled: true,
    radius: 8,
};

// Color helpers

export function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
    return (
        '#' +
        [r, g, b]
            .map((x) =>
                Math.round(x)
                    .toString(16)
                    .padStart(2, '0'),
            )
            .join('')
    );
}

function mixColor(hex: string, white: string, ratio: number): string {
    const [r1, g1, b1] = hexToRgb(hex);
    const [r2, g2, b2] = hexToRgb(white);
    return rgbToHex(r1 + (r2 - r1) * ratio, g1 + (g2 - g1) * ratio, b1 + (b2 - b1) * ratio);
}

export function tint(hex: string, amount: number): string {
    return mixColor(hex, '#ffffff', amount);
}

export function shade(hex: string, amount: number): string {
    return mixColor(hex, '#000000', amount);
}

export function googleFontsUrl(fonts: Array<{ name: string; weights: string }>): string {
    const families = fonts.map((f) => `family=${f.name.replace(/ /g, '+')}:wght@${f.weights}`).join('&');
    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export function variantsToWeights(variants: string[]): string {
    const weights = variants
        .map((v) => {
            if (v === 'regular') {
                return '400';
            }
            const num = parseInt(v, 10);
            return !isNaN(num) && num >= 100 && num <= 900 ? String(num) : null;
        })
        .filter((w): w is string => w !== null);
    const unique = [...new Set(weights)].sort();
    return unique.length > 0 ? unique.join(';') : '400';
}

export function fontMetaFromGoogleFont(font: GoogleFont): FontMeta {
    return {
        category: font.category,
        weights: variantsToWeights(font.variants),
    };
}

export function lookupFontMeta(fontName: string, meta?: FontMeta): { category: string; weights: string } {
    if (meta) {
        return meta;
    }
    const staticFont = ALL_STATIC_FONTS.find((f) => f.name === fontName);
    if (staticFont) {
        return { category: staticFont.category, weights: staticFont.weights };
    }
    return { category: 'sans-serif', weights: '400;700' };
}
