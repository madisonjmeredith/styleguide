import { useState, useMemo } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { neo } from './neo-utils';

type Props<T> = {
    items: T[];
    value: string;
    onChange: (value: string) => void;
    displayValue: (item: T) => string;
    filterKey: (item: T) => string;
    placeholder?: string;
    limit?: number;
    className?: string;
};

function NeoCombobox<T>({ items, value, onChange, displayValue, filterKey, placeholder = 'Search...', limit = 50, className }: Props<T>) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query) {
            return items.slice(0, limit);
        }
        const lower = query.toLowerCase();
        return items.filter((item) => filterKey(item).toLowerCase().includes(lower)).slice(0, limit);
    }, [items, query, filterKey, limit]);

    return (
        <div className={className}>
            <Combobox value={value} onChange={(v) => v && onChange(v)} onClose={() => setQuery('')}>
                <div className="relative">
                    <ComboboxInput
                        className={cn(
                            'w-full bg-white py-2 pl-3 pr-8 text-sm text-gray-900 outline-none',
                            neo.border,
                            neo.radius,
                            neo.shadow,
                            neo.focus,
                        )}
                        displayValue={() => value}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronsUpDown className="size-4 text-gray-500" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom start"
                    className={cn(
                        'z-50 mt-1 max-h-60 w-[var(--input-width)] overflow-auto bg-white py-1 text-sm empty:hidden',
                        neo.border,
                        neo.radius,
                        neo.shadow,
                    )}
                >
                    {filtered.length === 0 ? (
                        <div className="px-3 py-2 text-gray-400">No results found.</div>
                    ) : (
                        filtered.map((item) => {
                            const display = displayValue(item);
                            return (
                                <ComboboxOption
                                    key={filterKey(item)}
                                    value={filterKey(item)}
                                    className="group relative cursor-pointer select-none py-1.5 pl-8 pr-3 text-gray-900 data-[focus]:bg-neo data-[focus]:text-white"
                                >
                                    <span className="block truncate group-data-[selected]:font-semibold">{display}</span>
                                    <span className="absolute inset-y-0 left-0 hidden items-center pl-2 group-data-[selected]:flex">
                                        <Check className="size-3.5" />
                                    </span>
                                </ComboboxOption>
                            );
                        })
                    )}
                </ComboboxOptions>
            </Combobox>
        </div>
    );
}

export { NeoCombobox };
