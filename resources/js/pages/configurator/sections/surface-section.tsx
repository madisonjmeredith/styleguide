import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { StyleGuideConfig } from '@/types';
import { RADIUS_OPTIONS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function SurfaceSection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2.5 mt-6 block font-mono">
                Surface & Shape
            </Label>

            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-200">Borders</span>
                <Switch checked={config.borderEnabled} onCheckedChange={(v) => onUpdate('borderEnabled', v)} />
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-200">Shadows</span>
                <Switch checked={config.shadowEnabled} onCheckedChange={(v) => onUpdate('shadowEnabled', v)} />
            </div>

            <div className="mt-2">
                <div className="text-xs font-medium text-neutral-200 mb-1.5">Border Radius</div>
                <div className="flex gap-1">
                    {RADIUS_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onUpdate('radius', opt.value)}
                            className={`flex-1 py-1.5 text-[11px] font-mono cursor-pointer rounded-[5px] border transition-all duration-150 ${
                                config.radius === opt.value
                                    ? 'bg-indigo-400/15 border-indigo-400 text-indigo-300'
                                    : 'bg-transparent border-white/[0.08] text-neutral-400'
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
