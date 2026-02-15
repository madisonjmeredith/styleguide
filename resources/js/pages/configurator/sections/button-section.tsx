import { Label } from '@/components/ui/label';
import type { ButtonHoverStyle, StyleGuideConfig } from '@/types';
import { BUTTON_HOVER_STYLE_OPTIONS, TEXT_TRANSFORM_OPTIONS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function ButtonSection({ config, onUpdate }: Props) {
    return (
        <div className="py-6">
            <Label className="text-base font-semibold text-gray-900 mb-4 block">Buttons</Label>

            <div>
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Hover Style</div>
                <div className="flex gap-1">
                    {BUTTON_HOVER_STYLE_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('buttonHoverStyle', opt.id)}
                            className={`flex-1 py-2 text-sm cursor-pointer rounded-md border transition-all duration-150 ${
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

            <div className="mt-2">
                <div className="text-sm/6 font-medium text-gray-700 mb-1.5">Text Transform</div>
                <div className="flex gap-1">
                    {TEXT_TRANSFORM_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onUpdate('buttonTextTransform', opt.id)}
                            className={`flex-1 py-2 text-sm cursor-pointer rounded-md border transition-all duration-150 ${
                                config.buttonTextTransform === opt.id
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
