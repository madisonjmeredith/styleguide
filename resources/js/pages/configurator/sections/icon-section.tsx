import { Label } from '@/components/ui/label';
import type { IconLibrary, StyleGuideConfig } from '@/types';
import { ICON_LIBRARIES } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function IconSection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2.5 mt-6 block font-mono">
                Icon Library
            </Label>
            <div className="flex flex-col gap-1">
                {ICON_LIBRARIES.map((lib) => (
                    <label
                        key={lib.id}
                        className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-all duration-150 ${
                            config.iconLibrary === lib.id
                                ? 'bg-white/[0.06] border border-white/10'
                                : 'border border-transparent'
                        }`}
                    >
                        <div
                            className={`size-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                config.iconLibrary === lib.id ? 'border-indigo-400' : 'border-white/20'
                            }`}
                        >
                            {config.iconLibrary === lib.id && <div className="size-1.5 rounded-full bg-indigo-400" />}
                        </div>
                        <div>
                            <div className="text-xs font-medium text-neutral-200">{lib.label}</div>
                            <div className="text-[10px] text-neutral-500 mt-px">{lib.note}</div>
                        </div>
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
