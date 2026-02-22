import { useEffect, useState } from 'react';
import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoCombobox } from '@/components/neo/neo-combobox';
import { NeoRadioButton } from '@/components/neo/neo-radio-button';
import { NeoRadioCards } from '@/components/neo/neo-radio-cards';
import { NeoSelect, NeoSelectContent, NeoSelectItem, NeoSelectTrigger, NeoSelectValue } from '@/components/neo/neo-select';
import { NeoToggle } from '@/components/neo/neo-toggle';
import type { ButtonHoverStyle, ButtonLetterSpacing, ButtonStyle, FontMeta, StyleGuideConfig } from '@/types';
import type { GoogleFont } from '../data';
import { ALL_STATIC_FONTS, BUTTON_HOVER_STYLE_OPTIONS, BUTTON_LETTER_SPACING_OPTIONS, BUTTON_STYLE_OPTIONS, fontMetaFromGoogleFont } from '../data';

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

export function ButtonSection({ config, onUpdate }: Props) {
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

    const buttonWeights = parseWeights(config.buttonFontMeta);
    const buttonStyle = config.buttonStyle ?? 'filled';

    const handleFontChange = (family: string) => {
        const font = fonts.find((f) => f.family === family);
        if (!font) {
            return;
        }
        const meta = fontMetaFromGoogleFont(font);
        onUpdate('buttonFont', font.family);
        onUpdate('buttonFontMeta', meta);

        const available = parseWeights(meta);
        if (!available.includes(config.buttonFontWeight)) {
            onUpdate('buttonFontWeight', nearestWeight(available, config.buttonFontWeight));
        }
    };

    const styleOptions = BUTTON_STYLE_OPTIONS.map((opt) => ({
        id: opt.id as ButtonStyle,
        label: opt.label,
        description: opt.description,
    }));

    const hoverOptions = BUTTON_HOVER_STYLE_OPTIONS.map((opt) => ({
        id: opt.id as ButtonHoverStyle,
        label: opt.label,
        description: opt.description,
    }));

    return (
        <NeoAccordion title="Buttons">
            <div className="mb-3">
                <div className="mb-1 text-sm/6 font-semibold text-gray-700">Button Font</div>
                <NeoCombobox
                    items={fonts}
                    value={config.buttonFont}
                    onChange={handleFontChange}
                    displayValue={(f) => f.family}
                    filterKey={(f) => f.family}
                    placeholder="Search fonts..."
                />
            </div>

            <div className="mt-4">
                <div className="mb-1 text-sm/6 font-semibold text-gray-700">Button Font Weight</div>
                <NeoSelect value={String(config.buttonFontWeight)} onValueChange={(v) => onUpdate('buttonFontWeight', Number(v))}>
                    <NeoSelectTrigger className="h-9 text-sm">
                        <NeoSelectValue />
                    </NeoSelectTrigger>
                    <NeoSelectContent>
                        {buttonWeights.map((w) => (
                            <NeoSelectItem key={w} value={String(w)}>
                                {w} — {WEIGHT_LABELS[w] ?? w}
                            </NeoSelectItem>
                        ))}
                    </NeoSelectContent>
                </NeoSelect>
            </div>

            <div className="mt-4">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Button Letter Spacing</div>
                <NeoRadioCards
                    options={BUTTON_LETTER_SPACING_OPTIONS.map((opt) => ({ id: opt.id as ButtonLetterSpacing, label: opt.label }))}
                    value={config.buttonLetterSpacing}
                    onChange={(v) => onUpdate('buttonLetterSpacing', v)}
                />
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm/6 font-semibold text-gray-700">All-caps buttons</span>
                <NeoToggle
                    checked={config.buttonTextTransform === 'uppercase'}
                    onCheckedChange={(v) => onUpdate('buttonTextTransform', v ? 'uppercase' : 'none')}
                />
            </div>

            <div className="mt-4 mb-3">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Style</div>
                <NeoRadioButton
                    name="buttonStyle"
                    options={styleOptions}
                    value={buttonStyle}
                    onChange={(v) => onUpdate('buttonStyle', v)}
                />
            </div>

            <div>
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Hover Style</div>
                <NeoRadioButton
                    name="buttonHoverStyle"
                    options={hoverOptions}
                    value={config.buttonHoverStyle}
                    onChange={(v) => onUpdate('buttonHoverStyle', v)}
                />
            </div>
        </NeoAccordion>
    );
}
