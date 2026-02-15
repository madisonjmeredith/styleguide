import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { NeutralFamily, StyleGuideConfig } from '@/types';
import { useState } from 'react';
import { COLOR_PRESETS, NEUTRAL_PRESETS } from '../data';

type ColorMode = 'preset' | 'custom';

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    const matchedPreset = COLOR_PRESETS.find((p) => p.value === value);
    const [mode, setMode] = useState<ColorMode>(matchedPreset ? 'preset' : 'custom');

    return (
        <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
                <div className="text-sm/6 font-medium text-gray-700">{label}</div>
                <div className="flex gap-0.5 rounded-md bg-gray-100 p-0.5">
                    <button
                        type="button"
                        onClick={() => setMode('preset')}
                        className={`px-2 py-0.5 text-[11px] rounded cursor-pointer transition-colors ${
                            mode === 'preset'
                                ? 'bg-white text-gray-700 shadow-xs font-medium'
                                : 'text-gray-400 hover:text-gray-500'
                        }`}
                    >
                        Preset
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('custom')}
                        className={`px-2 py-0.5 text-[11px] rounded cursor-pointer transition-colors ${
                            mode === 'custom'
                                ? 'bg-white text-gray-700 shadow-xs font-medium'
                                : 'text-gray-400 hover:text-gray-500'
                        }`}
                    >
                        Custom
                    </button>
                </div>
            </div>

            {mode === 'preset' ? (
                <Select
                    value={matchedPreset ? value : undefined}
                    onValueChange={(v) => onChange(v)}
                >
                    <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Pick a color">
                            {matchedPreset && (
                                <span className="flex items-center gap-2">
                                    <span
                                        className="size-3 shrink-0 rounded-full border border-black/10"
                                        style={{ background: value }}
                                    />
                                    {matchedPreset.label}
                                </span>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {COLOR_PRESETS.map((preset) => (
                            <SelectItem key={preset.value} value={preset.value}>
                                <span className="flex items-center gap-2">
                                    <span
                                        className="size-3 shrink-0 rounded-full border border-black/10"
                                        style={{ background: preset.value }}
                                    />
                                    {preset.label}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : (
                <div className="flex items-center gap-2.5">
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-xs">
                        <div className="size-full" style={{ background: value }} />
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="absolute inset-0 cursor-pointer opacity-0 size-full"
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
                        className="text-xs font-mono text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1.5 w-24 outline-none focus:border-gray-300"
                    />
                </div>
            )}
        </div>
    );
}

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function ColorSection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-xs/6 font-semibold text-gray-400 mb-3 mt-6 block">
                Colors
            </Label>
            <ColorPicker label="Primary" value={config.primaryColor} onChange={(v) => onUpdate('primaryColor', v)} />
            <ColorPicker label="Secondary" value={config.secondaryColor} onChange={(v) => onUpdate('secondaryColor', v)} />

            <div className="mt-3 mb-1">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Neutral Family</div>
                <div className="flex gap-1">
                    {(Object.entries(NEUTRAL_PRESETS) as [NeutralFamily, (typeof NEUTRAL_PRESETS)[NeutralFamily]][]).map(
                        ([key, preset]) => (
                            <button
                                key={key}
                                onClick={() => onUpdate('neutralFamily', key)}
                                className={`flex-1 py-1.5 px-1 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                    config.neutralFamily === key
                                        ? 'border-green-600 bg-green-50 text-green-600 font-medium'
                                        : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {preset.label.replace(' Gray', '')}
                            </button>
                        ),
                    )}
                </div>
                <div className="flex mt-2 rounded overflow-hidden h-3">
                    {Object.values(NEUTRAL_PRESETS[config.neutralFamily].values).map((hex, i) => (
                        <div key={i} className="flex-1" style={{ background: hex }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
