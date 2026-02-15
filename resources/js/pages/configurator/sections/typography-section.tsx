import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import type { StyleGuideConfig, TypeScale } from '@/types';
import type { GoogleFont } from '../data';
import { ALL_STATIC_FONTS, BODY_LINE_HEIGHT_OPTIONS, FONT_WEIGHT_MAX, FONT_WEIGHT_MIN, FONT_WEIGHT_STEP, HEADING_LETTER_SPACING_OPTIONS, TYPE_SCALE_OPTIONS, fontMetaFromGoogleFont } from '../data';
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

    const handleHeadingChange = (font: GoogleFont) => {
        onUpdate('headingFont', font.family);
        onUpdate('headingFontMeta', fontMetaFromGoogleFont(font));
    };

    const handleBodyChange = (font: GoogleFont) => {
        onUpdate('bodyFont', font.family);
        onUpdate('bodyFontMeta', fontMetaFromGoogleFont(font));
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
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm/6 font-medium text-gray-700">Heading Font Weight</span>
                    <span className="text-sm font-mono text-gray-500">{config.headingFontWeight}</span>
                </div>
                <Slider
                    min={FONT_WEIGHT_MIN}
                    max={FONT_WEIGHT_MAX}
                    step={FONT_WEIGHT_STEP}
                    value={[config.headingFontWeight]}
                    onValueChange={([v]) => onUpdate('headingFontWeight', v)}
                />
            </div>

            <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm/6 font-medium text-gray-700">Body Font Weight</span>
                    <span className="text-sm font-mono text-gray-500">{config.bodyFontWeight}</span>
                </div>
                <Slider
                    min={FONT_WEIGHT_MIN}
                    max={FONT_WEIGHT_MAX}
                    step={FONT_WEIGHT_STEP}
                    value={[config.bodyFontWeight]}
                    onValueChange={([v]) => onUpdate('bodyFontWeight', v)}
                />
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
