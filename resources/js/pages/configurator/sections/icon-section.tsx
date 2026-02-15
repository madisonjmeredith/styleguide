import { Label } from '@/components/ui/label';
import type { IconLibrary, StyleGuideConfig } from '@/types';
import { ICON_LIBRARIES } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function IconSection({ config, onUpdate }: Props) {
    return (
        <div className="py-6">
            <Label className="text-base font-semibold text-gray-900 mb-4 block">
                Icon Library
            </Label>
            <div className="flex flex-col gap-1">
                {ICON_LIBRARIES.map((lib) => (
                    <label
                        key={lib.id}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-150 ${
                            config.iconLibrary === lib.id
                                ? 'bg-gray-50 border border-gray-200'
                                : 'border border-transparent hover:bg-gray-50'
                        }`}
                    >
                        <div
                            className={`size-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                config.iconLibrary === lib.id ? 'border-green-600' : 'border-gray-300'
                            }`}
                        >
                            {config.iconLibrary === lib.id && <div className="size-2 rounded-full bg-green-600" />}
                        </div>
                        <div className="text-sm/6 font-medium text-gray-700">{lib.label}</div>
                        <input
                            type="radio"
                            name="iconLibrary"
                            value={lib.id}
                            checked={config.iconLibrary === lib.id}
                            onChange={() => onUpdate('iconLibrary', lib.id as IconLibrary)}
                            className="sr-only"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}
