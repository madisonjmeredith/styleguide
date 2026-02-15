import { Label } from '@/components/ui/label';
import type { ButtonHoverStyle, StyleGuideConfig } from '@/types';
import { BUTTON_HOVER_STYLE_OPTIONS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function ButtonSection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-xs/6 font-semibold text-gray-400 mb-3 mt-6 block">Buttons</Label>

            <div>
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Hover Style</div>
                <div className="flex gap-1">
                    {BUTTON_HOVER_STYLE_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('buttonHoverStyle', opt.id)}
                            className={`flex-1 py-1.5 text-xs cursor-pointer rounded-md border transition-all duration-150 ${
                                config.buttonHoverStyle === opt.id
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
