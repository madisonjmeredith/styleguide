import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { StyleGuideConfig } from '@/types';
import { BORDER_WIDTH_OPTIONS, RADIUS_OPTIONS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function SurfaceSection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-xs/6 font-semibold text-gray-400 mb-3 mt-6 block">
                Surface & Shape
            </Label>

            <div className="mb-2.5">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Border Width</div>
                <div className="flex gap-1">
                    {BORDER_WIDTH_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onUpdate('borderWidth', opt.value)}
                            className={`flex-1 py-1.5 text-xs font-mono cursor-pointer rounded-md border transition-all duration-150 ${
                                config.borderWidth === opt.value
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm/6 font-medium text-gray-700">Shadows</span>
                <Switch checked={config.shadowEnabled} onCheckedChange={(v) => onUpdate('shadowEnabled', v)} />
            </div>

            <div className="mt-2">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Border Radius</div>
                <div className="flex gap-1">
                    {RADIUS_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onUpdate('radius', opt.value)}
                            className={`flex-1 py-1.5 text-xs font-mono cursor-pointer rounded-md border transition-all duration-150 ${
                                config.radius === opt.value
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
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
