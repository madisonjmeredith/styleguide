import { Label } from '@/components/ui/label';
import type { NeutralFamily, StyleGuideConfig } from '@/types';
import { NEUTRAL_PRESETS } from '../data';

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex items-center gap-2.5 mb-2">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-md border-2 border-white/10">
                <div className="size-full" style={{ background: value }} />
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0 size-full"
                />
            </div>
            <div className="flex-1">
                <div className="text-xs font-medium text-neutral-200 mb-0.5">{label}</div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
                            onChange(e.target.value);
                        }
                    }}
                    className="text-[11px] font-mono text-neutral-400 bg-transparent border-none outline-none p-0 w-20"
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
            <Label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2.5 mt-6 block font-mono">
                Colors
            </Label>
            <ColorPicker label="Primary" value={config.primaryColor} onChange={(v) => onUpdate('primaryColor', v)} />
            <ColorPicker label="Secondary" value={config.secondaryColor} onChange={(v) => onUpdate('secondaryColor', v)} />

            <div className="mt-3 mb-1">
                <div className="text-xs font-medium text-neutral-200 mb-1.5">Neutral Family</div>
                <div className="flex gap-1">
                    {(Object.entries(NEUTRAL_PRESETS) as [NeutralFamily, (typeof NEUTRAL_PRESETS)[NeutralFamily]][]).map(
                        ([key, preset]) => (
                            <button
                                key={key}
                                onClick={() => onUpdate('neutralFamily', key)}
                                className={`flex-1 py-1.5 px-1 text-[11px] cursor-pointer rounded-[5px] border transition-all duration-150 ${
                                    config.neutralFamily === key
                                        ? 'border-indigo-400 bg-indigo-400/15 text-indigo-300'
                                        : 'border-white/[0.08] bg-transparent text-neutral-400'
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
