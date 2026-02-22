import { useEffect, useState } from 'react';
import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoCombobox } from '@/components/neo/neo-combobox';
import { NeoRadioButton } from '@/components/neo/neo-radio-button';
import { NeoRadioCards } from '@/components/neo/neo-radio-cards';
import { NeoSelect, NeoSelectContent, NeoSelectItem, NeoSelectTrigger, NeoSelectValue } from '@/components/neo/neo-select';
import { NeoToggle } from '@/components/neo/neo-toggle';
import type { FontMeta, StyleGuideConfig, TypeScale } from '@/types';
import type { GoogleFont } from '../data';
import { ALL_STATIC_FONTS, BODY_LINE_HEIGHT_OPTIONS, HEADING_LETTER_SPACING_OPTIONS, TYPE_SCALE_OPTIONS, fontMetaFromGoogleFont } from '../data';

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

    const handleHeadingChange = (family: string) => {
        const font = fonts.find((f) => f.family === family);
        if (!font) {
            return;
        }
        const meta = fontMetaFromGoogleFont(font);
        onUpdate('headingFont', font.family);
        onUpdate('headingFontMeta', meta);

        const available = parseWeights(meta);
        if (!available.includes(config.headingFontWeight)) {
            onUpdate('headingFontWeight', nearestWeight(available, config.headingFontWeight));
        }
    };

    const handleBodyChange = (family: string) => {
        const font = fonts.find((f) => f.family === family);
        if (!font) {
            return;
        }
        const meta = fontMetaFromGoogleFont(font);
        onUpdate('bodyFont', font.family);
        onUpdate('bodyFontMeta', meta);

        const available = parseWeights(meta);
        if (!available.includes(config.bodyFontWeight)) {
            onUpdate('bodyFontWeight', nearestWeight(available, config.bodyFontWeight));
        }
    };

    const typeScaleOptions = TYPE_SCALE_OPTIONS.map((opt) => ({
        id: opt.id as TypeScale,
        label: opt.label,
    }));

    return (
        <NeoAccordion title="Typography">
            <div className="mb-3">
                <div className="mb-1 text-sm/6 font-semibold text-gray-700">Body Font</div>
                <NeoCombobox
                    items={fonts}
                    value={config.bodyFont}
                    onChange={handleBodyChange}
                    displayValue={(f) => f.family}
                    filterKey={(f) => f.family}
                    placeholder="Search fonts..."
                />
            </div>

            <div className="mt-4">
                <div className="mb-1 text-sm/6 font-semibold text-gray-700">Body Font Weight</div>
                <NeoSelect value={String(config.bodyFontWeight)} onValueChange={(v) => onUpdate('bodyFontWeight', Number(v))}>
                    <NeoSelectTrigger className="h-9 text-sm">
                        <NeoSelectValue />
                    </NeoSelectTrigger>
                    <NeoSelectContent>
                        {bodyWeights.map((w) => (
                            <NeoSelectItem key={w} value={String(w)}>
                                {w} — {WEIGHT_LABELS[w] ?? w}
                            </NeoSelectItem>
                        ))}
                    </NeoSelectContent>
                </NeoSelect>
            </div>

            <div className="mt-4">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Type Scale</div>
                <NeoRadioButton
                    name="typeScale"
                    options={typeScaleOptions}
                    value={config.typeScale}
                    onChange={(v) => onUpdate('typeScale', v)}
                />
            </div>

            <div className="mt-4">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Line Height</div>
                <NeoRadioCards
                    options={BODY_LINE_HEIGHT_OPTIONS.map((opt) => ({ id: opt.id, label: opt.label }))}
                    value={config.bodyLineHeight}
                    onChange={(v) => onUpdate('bodyLineHeight', v)}
                />
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="mt-4">
                <div className="mb-1 text-sm/6 font-semibold text-gray-700">Heading Font</div>
                <NeoCombobox
                    items={fonts}
                    value={config.headingFont}
                    onChange={handleHeadingChange}
                    displayValue={(f) => f.family}
                    filterKey={(f) => f.family}
                    placeholder="Search fonts..."
                />
            </div>

            <div className="mt-4">
                <div className="mb-1 text-sm/6 font-semibold text-gray-700">Heading Font Weight</div>
                <NeoSelect value={String(config.headingFontWeight)} onValueChange={(v) => onUpdate('headingFontWeight', Number(v))}>
                    <NeoSelectTrigger className="h-9 text-sm">
                        <NeoSelectValue />
                    </NeoSelectTrigger>
                    <NeoSelectContent>
                        {headingWeights.map((w) => (
                            <NeoSelectItem key={w} value={String(w)}>
                                {w} — {WEIGHT_LABELS[w] ?? w}
                            </NeoSelectItem>
                        ))}
                    </NeoSelectContent>
                </NeoSelect>
            </div>

            <div className="mt-4">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Heading Letter Spacing</div>
                <NeoRadioCards
                    options={HEADING_LETTER_SPACING_OPTIONS.map((opt) => ({ id: opt.id, label: opt.label }))}
                    value={config.headingLetterSpacing}
                    onChange={(v) => onUpdate('headingLetterSpacing', v)}
                />
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm/6 font-semibold text-gray-700">All-caps headings</span>
                <NeoToggle
                    checked={config.headingTextTransform === 'uppercase'}
                    onCheckedChange={(v) => onUpdate('headingTextTransform', v ? 'uppercase' : 'none')}
                />
            </div>
        </NeoAccordion>
    );
}
