import { Label } from '@/components/ui/label';
import type { NeutralFamily, StyleGuideConfig } from '@/types';
import { NEUTRAL_PRESETS } from '../data';

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex items-center gap-2.5 mb-2">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-xs">
                <div className="size-full" style={{ background: value }} />
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0 size-full"
                />
            </div>
            <div className="flex-1">
                <div className="text-sm/6 font-medium text-gray-700">{label}</div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
                            onChange(e.target.value);
                        }
                    }}
                    className="text-xs font-mono text-gray-400 bg-transparent border-none outline-none p-0 w-20"
                />
            </div>
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
