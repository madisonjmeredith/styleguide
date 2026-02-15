import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { FontMeta, StyleGuideConfig, TypeScale } from '@/types';
import type { GoogleFont } from '../data';
import { ALL_STATIC_FONTS, BODY_LINE_HEIGHT_OPTIONS, HEADING_LETTER_SPACING_OPTIONS, TYPE_SCALE_OPTIONS, fontMetaFromGoogleFont } from '../data';
import { FontCombobox } from '../font-combobox';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

function staticToGoogleFonts(): GoogleFont[] {
    return ALL_STATIC_FONTS.map((f) => ({
        family: f.name,
        category: f.category,
        variants: f.weights.split(';').map((w) => (w === '400' ? 'regular' : w)),
    }));
}

function parseWeights(meta?: FontMeta): number[] {
    const str = meta?.weights ?? '400;700';
    return str.split(';').map(Number).sort((a, b) => a - b);
}

function nearestWeight(available: number[], target: number): number {
    return available.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));
}

const WEIGHT_LABELS: Record<number, string> = {
    100: 'Thin',
    200: 'Extra Light',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'Semibold',
    700: 'Bold',
    800: 'Extra Bold',
    900: 'Black',
};

export function TypographySection({ config, onUpdate }: Props) {
    const [fonts, setFonts] = useState<GoogleFont[]>(staticToGoogleFonts);

    useEffect(() => {
        fetch('/google-fonts')
            .then((res) => res.json())
            .then((data: GoogleFont[]) => {
                if (Array.isArray(data) && data.length > 0) {
                    setFonts(data);
                }
            })
            .catch(() => {
                // Keep fallback fonts
            });
    }, []);

    const headingWeights = parseWeights(config.headingFontMeta);
    const bodyWeights = parseWeights(config.bodyFontMeta);

    const handleHeadingChange = (font: GoogleFont) => {
        const meta = fontMetaFromGoogleFont(font);
        onUpdate('headingFont', font.family);
        onUpdate('headingFontMeta', meta);

        const available = parseWeights(meta);
        if (!available.includes(config.headingFontWeight)) {
            onUpdate('headingFontWeight', nearestWeight(available, config.headingFontWeight));
        }
    };

    const handleBodyChange = (font: GoogleFont) => {
        const meta = fontMetaFromGoogleFont(font);
        onUpdate('bodyFont', font.family);
        onUpdate('bodyFontMeta', meta);

        const available = parseWeights(meta);
        if (!available.includes(config.bodyFontWeight)) {
            onUpdate('bodyFontWeight', nearestWeight(available, config.bodyFontWeight));
        }
    };

    return (
        <div className="py-6">
            <Label className="text-base font-semibold text-gray-900 mb-4 block">
                Typography
            </Label>

            <div className="mb-3">
                <div className="text-sm/6 font-medium text-gray-700 mb-1">Heading Font</div>
                <FontCombobox
                    fonts={fonts}
                    value={config.headingFont}
                    onChange={handleHeadingChange}
                />
            </div>

            <div className="mb-3">
                <div className="text-sm/6 font-medium text-gray-700 mb-1">Body Font</div>
                <FontCombobox
                    fonts={fonts}
                    value={config.bodyFont}
                    onChange={handleBodyChange}
                />
            </div>

            <div className="mt-2">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Type Scale</div>
                <div className="flex flex-col gap-1">
                    {TYPE_SCALE_OPTIONS.map((opt) => (
                        <label
                            key={opt.id}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-150 ${
                                config.typeScale === opt.id
                                    ? 'bg-gray-50 border border-gray-200'
                                    : 'border border-transparent hover:bg-gray-50'
                            }`}
                        >
                            <div
                                className={`size-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    config.typeScale === opt.id ? 'border-green-600' : 'border-gray-300'
                                }`}
                            >
                                {config.typeScale === opt.id && <div className="size-2 rounded-full bg-green-600" />}
                            </div>
                            <div className="text-sm/6 font-medium text-gray-700">{opt.label}</div>
                            <input
                                type="radio"
                                name="typeScale"
                                value={opt.id}
                                checked={config.typeScale === opt.id}
                                onChange={() => onUpdate('typeScale', opt.id as TypeScale)}
                                className="sr-only"
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <div className="text-sm/6 font-medium text-gray-700 mb-1">Heading Font Weight</div>
                <select
                    value={config.headingFontWeight}
                    onChange={(e) => onUpdate('headingFontWeight', Number(e.target.value))}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-xs outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                >
                    {headingWeights.map((w) => (
                        <option key={w} value={w}>
                            {w} — {WEIGHT_LABELS[w] ?? w}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-4">
                <div className="text-sm/6 font-medium text-gray-700 mb-1">Body Font Weight</div>
                <select
                    value={config.bodyFontWeight}
                    onChange={(e) => onUpdate('bodyFontWeight', Number(e.target.value))}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-xs outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                >
                    {bodyWeights.map((w) => (
                        <option key={w} value={w}>
                            {w} — {WEIGHT_LABELS[w] ?? w}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-2">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Heading Letter Spacing</div>
                <div className="flex gap-1">
                    {HEADING_LETTER_SPACING_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('headingLetterSpacing', opt.id)}
                            className={`flex-1 py-2 text-sm cursor-pointer rounded-md border transition-all duration-150 ${
                                config.headingLetterSpacing === opt.id
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-2">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Body Line Height</div>
                <div className="flex gap-1">
                    {BODY_LINE_HEIGHT_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('bodyLineHeight', opt.id)}
                            className={`flex-1 py-2 text-sm cursor-pointer rounded-md border transition-all duration-150 ${
                                config.bodyLineHeight === opt.id
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-700">All-caps headings</span>
                <Switch
                    checked={config.headingTextTransform === 'uppercase'}
                    onCheckedChange={(v) => onUpdate('headingTextTransform', v ? 'uppercase' : 'none')}
                />
            </div>
        </div>
    );
}
