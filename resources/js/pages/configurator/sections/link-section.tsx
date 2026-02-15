import { Label } from '@/components/ui/label';
import type { LinkColor, LinkHoverColor, LinkUnderlineOnHover, StyleGuideConfig } from '@/types';

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

const LINK_UNDERLINE_OPTIONS: Array<{ value: boolean; label: string }> = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

const LINK_UNDERLINE_HOVER_OPTIONS: Array<{ id: LinkUnderlineOnHover; label: string }> = [
    { id: 'show', label: 'Show' },
    { id: 'remove', label: 'Remove' },
    { id: 'none', label: 'No change' },
];

export function LinkSection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-xs/6 font-semibold text-gray-400 mb-3 mt-6 block">Links</Label>

            <div className="mb-2.5">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Color</div>
                <div className="flex gap-1">
                    {LINK_COLOR_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('linkColor', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
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
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
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

            <div className="mb-2.5">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Underline</div>
                <div className="flex gap-1">
                    {LINK_UNDERLINE_OPTIONS.map((opt) => (
                        <button
                            key={String(opt.value)}
                            onClick={() => onUpdate('linkUnderline', opt.value)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.linkUnderline === opt.value
                                    ? 'bg-green-50 border-green-600 text-green-600 font-medium'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Underline on Hover</div>
                <div className="flex gap-1">
                    {LINK_UNDERLINE_HOVER_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('linkUnderlineOnHover', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.linkUnderlineOnHover === opt.id
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
