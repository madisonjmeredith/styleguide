import { useState } from 'react';
import { cn } from '@/lib/utils';
import { neo } from './neo-utils';
import { NeoSelect, NeoSelectContent, NeoSelectItem, NeoSelectTrigger, NeoSelectValue } from './neo-select';

type Preset = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    presets: Preset[];
};

type ColorMode = 'preset' | 'custom';

function NeoColorPicker({ label, value, onChange, presets }: Props) {
    const matchedPreset = presets.find((p) => p.value === value);
    const [mode, setMode] = useState<ColorMode>(matchedPreset ? 'preset' : 'custom');

    return (
        <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
                <div className="text-sm/6 font-semibold text-gray-700">{label}</div>
                <div className={cn('flex gap-0.5 border-2 border-neo p-0.5', neo.radius)}>
                    {(['preset', 'custom'] as const).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            className={cn(
                                'px-2.5 py-0.5 text-xs cursor-pointer transition-colors rounded-[3px]',
                                mode === m ? 'bg-neo text-white font-semibold' : 'text-gray-500 hover:text-neo',
                            )}
                        >
                            {m === 'preset' ? 'Preset' : 'Custom'}
                        </button>
                    ))}
                </div>
            </div>

            {mode === 'preset' ? (
                <NeoSelect value={matchedPreset ? value : undefined} onValueChange={onChange}>
                    <NeoSelectTrigger className="h-9 text-sm">
                        <NeoSelectValue placeholder="Pick a color">
                            {matchedPreset && (
                                <span className="flex items-center gap-2">
                                    <span
                                        className="size-3 shrink-0 rounded-full border-2 border-neo/20"
                                        style={{ background: value }}
                                    />
                                    {matchedPreset.label}
                                </span>
                            )}
                        </NeoSelectValue>
                    </NeoSelectTrigger>
                    <NeoSelectContent>
                        {presets.map((preset) => (
                            <NeoSelectItem key={preset.value} value={preset.value}>
                                <span className="flex items-center gap-2">
                                    <span
                                        className="size-3 shrink-0 rounded-full border-2 border-neo/20"
                                        style={{ background: preset.value }}
                                    />
                                    {preset.label}
                                </span>
                            </NeoSelectItem>
                        ))}
                    </NeoSelectContent>
                </NeoSelect>
            ) : (
                <div className="flex items-center gap-2.5">
                    <div className={cn('relative size-8 shrink-0 overflow-hidden border-2 border-neo', neo.radius)}>
                        <div className="size-full" style={{ background: value }} />
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="absolute inset-0 size-full cursor-pointer opacity-0"
                        />
                    </div>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
                                onChange(e.target.value);
                            }
                        }}
                        className={cn(
                            'w-24 bg-transparent px-2 py-1.5 font-mono text-xs text-gray-600 outline-none border-2 border-neo',
                            neo.radius,
                            neo.focus,
                        )}
                    />
                </div>
            )}
        </div>
    );
}

export { NeoColorPicker };
