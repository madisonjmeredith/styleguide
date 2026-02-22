import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoRadioButton } from '@/components/neo/neo-radio-button';
import type { IconLibrary, StyleGuideConfig } from '@/types';
import { ICON_LIBRARIES } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function IconSection({ config, onUpdate }: Props) {
    const options = ICON_LIBRARIES.map((lib) => ({
        id: lib.id as IconLibrary,
        label: lib.label,
    }));

    return (
        <NeoAccordion title="Icons">
            <NeoRadioButton
                name="iconLibrary"
                options={options}
                value={config.iconLibrary}
                onChange={(v) => onUpdate('iconLibrary', v)}
            />
        </NeoAccordion>
    );
}
