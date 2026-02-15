import { useState, useMemo } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { GoogleFont } from './data';

const CATEGORIES = ['all', 'sans-serif', 'serif', 'display', 'handwriting', 'monospace'] as const;

const CATEGORY_LABELS: Record<string, string> = {
    all: 'All',
    'sans-serif': 'Sans Serif',
    serif: 'Serif',
    display: 'Display',
    handwriting: 'Handwriting',
    monospace: 'Monospace',
};

type Props = {
    fonts: GoogleFont[];
    value: string;
    onChange: (font: GoogleFont) => void;
};

export function FontCombobox({ fonts, value, onChange }: Props) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<string>('all');

    const filtered = useMemo(() => {
        let results = fonts;

        if (category !== 'all') {
            results = results.filter((f) => f.category === category);
        }

        if (query) {
            const lower = query.toLowerCase();
            results = results.filter((f) => f.family.toLowerCase().includes(lower));
        }

        return results.slice(0, 50);
    }, [fonts, query, category]);

    const selectedFont = fonts.find((f) => f.family === value);

    return (
        <div>
            <div className="flex flex-wrap gap-1 mb-1.5">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                            category === cat
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        {CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

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
                                <span className="ml-1 text-[11px] text-gray-400">
                                    {font.category}
                                </span>
                                <span className="absolute inset-y-0 left-0 hidden items-center pl-2 group-data-[selected]:flex">
                                    <Check className="size-3.5 text-gray-600" />
                                </span>
                            </ComboboxOption>
                        ))
                    )}
                </ComboboxOptions>
            </Combobox>

            {selectedFont && (
                <div className="mt-1 text-[11px] text-gray-400">
                    {selectedFont.category}
                </div>
            )}
        </div>
    );
}
