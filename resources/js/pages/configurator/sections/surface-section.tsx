import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoRadioCards } from '@/components/neo/neo-radio-cards';
import { NeoSlider } from '@/components/neo/neo-slider';
import { NeoToggle } from '@/components/neo/neo-toggle';
import type { StyleGuideConfig } from '@/types';
import { BORDER_WIDTH_OPTIONS, RADIUS_MAX, RADIUS_MIN, RADIUS_STEP } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function SurfaceSection({ config, onUpdate }: Props) {
    return (
        <NeoAccordion title="Surface & Shape">
            <div className="mb-2.5">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Border Width</div>
                <NeoRadioCards
                    options={BORDER_WIDTH_OPTIONS.map((opt) => ({ id: String(opt.value), label: opt.label }))}
                    value={String(config.borderWidth)}
                    onChange={(v) => onUpdate('borderWidth', Number(v))}
                />
            </div>

            <div className="mb-4">
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm/6 font-semibold text-gray-700">Border Radius</span>
                    <span className="font-mono text-sm font-bold text-gray-500">{config.radius}px</span>
                </div>
                <NeoSlider
                    min={RADIUS_MIN}
                    max={RADIUS_MAX}
                    step={RADIUS_STEP}
                    value={[config.radius]}
                    onValueChange={([v]) => onUpdate('radius', v)}
                />
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm/6 font-semibold text-gray-700">Shadows</span>
                <NeoToggle checked={config.shadowEnabled} onCheckedChange={(v) => onUpdate('shadowEnabled', v)} />
            </div>
        </NeoAccordion>
    );
}
