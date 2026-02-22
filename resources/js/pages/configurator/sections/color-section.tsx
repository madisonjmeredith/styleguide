import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoColorPicker } from '@/components/neo/neo-color-picker';
import { NeoRadioCards } from '@/components/neo/neo-radio-cards';
import type { NeutralFamily, StyleGuideConfig } from '@/types';
import { COLOR_PRESETS, NEUTRAL_PRESETS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function ColorSection({ config, onUpdate }: Props) {
    const neutralOptions = (Object.entries(NEUTRAL_PRESETS) as [NeutralFamily, (typeof NEUTRAL_PRESETS)[NeutralFamily]][]).map(
        ([key, preset]) => ({
            id: key,
            label: preset.label.replace(' Gray', ''),
        }),
    );

    return (
        <NeoAccordion title="Colors">
            <NeoColorPicker label="Primary" value={config.primaryColor} onChange={(v) => onUpdate('primaryColor', v)} presets={COLOR_PRESETS} />
            <NeoColorPicker label="Secondary" value={config.secondaryColor} onChange={(v) => onUpdate('secondaryColor', v)} presets={COLOR_PRESETS} />

            <div className="mt-3 mb-1">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Neutral Family</div>
                <NeoRadioCards options={neutralOptions} value={config.neutralFamily} onChange={(v) => onUpdate('neutralFamily', v)} />
                <div className="mt-2 flex h-5 overflow-hidden rounded-[5px]">
                    {Object.values(NEUTRAL_PRESETS[config.neutralFamily].values).map((hex, i) => (
                        <div key={i} className="flex-1" style={{ background: hex }} />
                    ))}
                </div>
            </div>
        </NeoAccordion>
    );
}
