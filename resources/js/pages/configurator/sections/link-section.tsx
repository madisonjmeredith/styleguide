import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
        <div className="py-6">
            <Label className="text-base font-semibold text-gray-900 mb-4 block">Links</Label>

            <div className="mb-2.5">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Color</div>
                <div className="flex gap-1">
                    {LINK_COLOR_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('linkColor', opt.id)}
                            className={`flex-1 py-2 text-sm cursor-pointer rounded-md border transition-all duration-150 ${
                                config.linkColor === opt.id
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-2.5">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Hover Color</div>
                <div className="flex gap-1">
                    {LINK_HOVER_COLOR_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('linkHoverColor', opt.id)}
                            className={`flex-1 py-2 text-sm cursor-pointer rounded-md border transition-all duration-150 ${
                                config.linkHoverColor === opt.id
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-2.5 flex items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-700">Underline</span>
                <Switch
                    checked={config.linkUnderline}
                    onCheckedChange={handleUnderlineChange}
                />
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-700">Toggle underline on hover</span>
                <Switch
                    checked={isHoverToggle}
                    onCheckedChange={handleHoverToggle}
                />
            </div>
        </div>
    );
}
