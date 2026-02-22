import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoRadioButton } from '@/components/neo/neo-radio-button';
import { NeoToggle } from '@/components/neo/neo-toggle';
import type { ButtonHoverStyle, ButtonStyle, StyleGuideConfig } from '@/types';
import { BUTTON_HOVER_STYLE_OPTIONS, BUTTON_STYLE_OPTIONS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function ButtonSection({ config, onUpdate }: Props) {
    const buttonStyle = config.buttonStyle ?? 'filled';

    const styleOptions = BUTTON_STYLE_OPTIONS.map((opt) => ({
        id: opt.id as ButtonStyle,
        label: opt.label,
        description: opt.description,
    }));

    const hoverOptions = BUTTON_HOVER_STYLE_OPTIONS.map((opt) => ({
        id: opt.id as ButtonHoverStyle,
        label: opt.label,
    }));

    return (
        <NeoAccordion title="Buttons">
            <div className="mb-3">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Style</div>
                <NeoRadioButton
                    name="buttonStyle"
                    options={styleOptions}
                    value={buttonStyle}
                    onChange={(v) => onUpdate('buttonStyle', v)}
                />
            </div>

            <div>
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Hover Style</div>
                <NeoRadioButton
                    name="buttonHoverStyle"
                    options={hoverOptions}
                    value={config.buttonHoverStyle}
                    onChange={(v) => onUpdate('buttonHoverStyle', v)}
                />
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm/6 font-semibold text-gray-700">All-caps buttons</span>
                <NeoToggle
                    checked={config.buttonTextTransform === 'uppercase'}
                    onCheckedChange={(v) => onUpdate('buttonTextTransform', v ? 'uppercase' : 'none')}
                />
            </div>
        </NeoAccordion>
    );
}
