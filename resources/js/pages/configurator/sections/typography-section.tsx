import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import type { StyleGuideConfig } from '@/types';
import type { GoogleFont } from '../data';
import { ALL_STATIC_FONTS, fontMetaFromGoogleFont } from '../data';
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
        </div>
    );
}
