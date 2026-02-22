import { NeoCombobox } from '@/components/neo/neo-combobox';
import type { GoogleFont } from './data';

type Props = {
    fonts: GoogleFont[];
    value: string;
    onChange: (font: GoogleFont) => void;
};

export function FontCombobox({ fonts, value, onChange }: Props) {
    return (
        <NeoCombobox
            items={fonts}
            value={value}
            onChange={(family) => {
                const font = fonts.find((f) => f.family === family);
                if (font) {
                    onChange(font);
                }
            }}
            displayValue={(f) => f.family}
            filterKey={(f) => f.family}
            placeholder="Search fonts..."
        />
    );
}
