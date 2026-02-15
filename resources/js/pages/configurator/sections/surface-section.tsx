import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import type { StyleGuideConfig } from '@/types';
import { BORDER_WIDTH_OPTIONS, RADIUS_MAX, RADIUS_MIN, RADIUS_STEP } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function SurfaceSection({ config, onUpdate }: Props) {
    return (
        <div className="py-6">
            <Label className="text-base font-semibold text-gray-900 mb-4 block">
                Surface & Shape
            </Label>

            <div className="mb-2.5">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Border Width</div>
                <div className="flex gap-1">
                    {BORDER_WIDTH_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onUpdate('borderWidth', opt.value)}
                            className={`flex-1 py-2 text-sm font-mono cursor-pointer rounded-md border transition-all duration-150 ${
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

            <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm/6 font-medium text-gray-700">Border Radius</span>
                    <span className="text-sm font-mono text-gray-500">{config.radius}px</span>
                </div>
                <Slider
                    min={RADIUS_MIN}
                    max={RADIUS_MAX}
                    step={RADIUS_STEP}
                    value={[config.radius]}
                    onValueChange={([v]) => onUpdate('radius', v)}
                />
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-700">Shadows</span>
                <Switch checked={config.shadowEnabled} onCheckedChange={(v) => onUpdate('shadowEnabled', v)} />
            </div>
        </div>
    );
}
