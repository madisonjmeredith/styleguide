import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { ButtonHoverStyle, StyleGuideConfig } from '@/types';
import { BUTTON_HOVER_STYLE_OPTIONS } from '../data';

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
                <div className="flex flex-col gap-1">
                    {BUTTON_HOVER_STYLE_OPTIONS.map((opt) => (
                        <label
                            key={opt.id}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-150 ${
                                config.buttonHoverStyle === opt.id
                                    ? 'bg-gray-50 border border-gray-200'
                                    : 'border border-transparent hover:bg-gray-50'
                            }`}
                        >
                            <div
                                className={`size-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    config.buttonHoverStyle === opt.id ? 'border-green-600' : 'border-gray-300'
                                }`}
                            >
                                {config.buttonHoverStyle === opt.id && <div className="size-2 rounded-full bg-green-600" />}
                            </div>
                            <div className="text-sm/6 font-medium text-gray-700">{opt.label}</div>
                            <input
                                type="radio"
                                name="buttonHoverStyle"
                                value={opt.id}
                                checked={config.buttonHoverStyle === opt.id}
                                onChange={() => onUpdate('buttonHoverStyle', opt.id as ButtonHoverStyle)}
                                className="sr-only"
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-700">All-caps buttons</span>
                <Switch
                    checked={config.buttonTextTransform === 'uppercase'}
                    onCheckedChange={(v) => onUpdate('buttonTextTransform', v ? 'uppercase' : 'none')}
                />
            </div>
        </div>
    );
}
