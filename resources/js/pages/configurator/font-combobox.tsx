import { useState, useMemo } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { GoogleFont } from './data';

type Props = {
    fonts: GoogleFont[];
    value: string;
    onChange: (font: GoogleFont) => void;
};

export function FontCombobox({ fonts, value, onChange }: Props) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query) {
            return fonts.slice(0, 50);
        }

        const lower = query.toLowerCase();

        return fonts.filter((f) => f.family.toLowerCase().includes(lower)).slice(0, 50);
    }, [fonts, query]);

    const selectedFont = fonts.find((f) => f.family === value);

    return (
        <div>
            <Combobox
                value={value}
                onChange={(family) => {
                    if (!family) {
                        return;
                    }
                    const font = fonts.find((f) => f.family === family);
                    if (font) {
                        onChange(font);
                    }
                }}
                onClose={() => setQuery('')}
            >
                <div className="relative">
                    <ComboboxInput
                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 shadow-xs outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                        displayValue={() => value}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search fonts..."
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronsUpDown className="size-4 text-gray-400" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom start"
                    className="z-50 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg empty:hidden"
                >
                    {filtered.length === 0 ? (
                        <div className="px-3 py-2 text-gray-400">No fonts found.</div>
                    ) : (
                        filtered.map((font) => (
                            <ComboboxOption
                                key={font.family}
                                value={font.family}
                                className="group relative cursor-pointer select-none py-1.5 pl-8 pr-3 text-gray-900 data-[focus]:bg-gray-100"
                            >
                                <span className="block truncate group-data-[selected]:font-semibold">
                                    {font.family}
                                </span>
                                <span className="absolute inset-y-0 left-0 hidden items-center pl-2 group-data-[selected]:flex">
                                    <Check className="size-3.5 text-gray-600" />
                                </span>
                            </ComboboxOption>
                        ))
                    )}
                </ComboboxOptions>
            </Combobox>

        </div>
    );
}
