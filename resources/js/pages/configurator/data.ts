import type { StyleGuideConfig } from '@/types';

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
    { id: 'heroicons' as const, label: 'Heroicons', note: 'Inline SVGs · Tailwind team' },
    { id: 'feather' as const, label: 'Feather Icons', note: 'data-feather attr · lightweight' },
];

export const RADIUS_OPTIONS = [
    { value: 0, label: '0' },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
    { value: 16, label: '16' },
];

export const DEFAULT_CONFIG: StyleGuideConfig = {
    primaryColor: '#4f46e5',
    secondaryColor: '#d946ef',
    neutralFamily: 'cool',
    headingFont: 'Fraunces',
    bodyFont: 'DM Sans',
    iconLibrary: 'heroicons',
    borderEnabled: true,
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
