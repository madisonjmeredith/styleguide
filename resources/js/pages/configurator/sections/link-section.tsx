import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoRadioCards } from '@/components/neo/neo-radio-cards';
import { NeoToggle } from '@/components/neo/neo-toggle';
import type { LinkColor, LinkHoverColor, StyleGuideConfig } from '@/types';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

const LINK_COLOR_OPTIONS: Array<{ id: LinkColor; label: string }> = [
    { id: 'primary', label: 'Primary' },
    { id: 'secondary', label: 'Secondary' },
];

const LINK_HOVER_COLOR_OPTIONS: Array<{ id: LinkHoverColor; label: string }> = [
    { id: 'darker', label: 'Darker' },
    { id: 'lighter', label: 'Lighter' },
    { id: 'none', label: 'No change' },
];

export function LinkSection({ config, onUpdate }: Props) {
    const isHoverToggle = config.linkUnderlineOnHover !== 'none';

    const handleUnderlineChange = (checked: boolean) => {
        onUpdate('linkUnderline', checked);
        if (isHoverToggle) {
            onUpdate('linkUnderlineOnHover', checked ? 'remove' : 'show');
        }
    };

    const handleHoverToggle = (checked: boolean) => {
        if (checked) {
            onUpdate('linkUnderlineOnHover', config.linkUnderline ? 'remove' : 'show');
        } else {
            onUpdate('linkUnderlineOnHover', 'none');
        }
    };

    return (
        <NeoAccordion title="Links">
            <div className="mb-2.5">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Color</div>
                <NeoRadioCards options={LINK_COLOR_OPTIONS} value={config.linkColor} onChange={(v) => onUpdate('linkColor', v)} />
            </div>

            <div className="mb-2.5">
                <div className="mb-1.5 text-sm/6 font-semibold text-gray-700">Hover Color</div>
                <NeoRadioCards options={LINK_HOVER_COLOR_OPTIONS} value={config.linkHoverColor} onChange={(v) => onUpdate('linkHoverColor', v)} />
            </div>

            <div className="mb-2.5 flex items-center justify-between">
                <span className="text-sm/6 font-semibold text-gray-700">Underline</span>
                <NeoToggle checked={config.linkUnderline} onCheckedChange={handleUnderlineChange} />
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm/6 font-semibold text-gray-700">Toggle underline on hover</span>
                <NeoToggle checked={isHoverToggle} onCheckedChange={handleHoverToggle} />
            </div>
        </NeoAccordion>
    );
}
