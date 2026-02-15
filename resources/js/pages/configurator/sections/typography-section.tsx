import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import type { StyleGuideConfig } from '@/types';
import type { GoogleFont } from '../data';
import { ALL_STATIC_FONTS, BODY_LINE_HEIGHT_OPTIONS, FONT_WEIGHT_OPTIONS, HEADING_LETTER_SPACING_OPTIONS, TEXT_TRANSFORM_OPTIONS, TYPE_SCALE_OPTIONS, fontMetaFromGoogleFont } from '../data';
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
        <div>
            <Label className="text-xs/6 font-semibold text-gray-400 mb-3 mt-6 block">
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
                <div className="flex gap-1">
                    {TYPE_SCALE_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('typeScale', opt.id)}
                            title={opt.description}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.typeScale === opt.id
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
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Heading Font Weight</div>
                <div className="flex gap-1">
                    {FONT_WEIGHT_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('headingFontWeight', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.headingFontWeight === opt.id
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
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Body Font Weight</div>
                <div className="flex gap-1">
                    {FONT_WEIGHT_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('bodyFontWeight', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.bodyFontWeight === opt.id
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
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Heading Letter Spacing</div>
                <div className="flex gap-1">
                    {HEADING_LETTER_SPACING_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('headingLetterSpacing', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
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
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
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

            <div className="mt-2">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Heading Text Transform</div>
                <div className="flex gap-1">
                    {TEXT_TRANSFORM_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('headingTextTransform', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.headingTextTransform === opt.id
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
