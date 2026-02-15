import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StyleGuideConfig } from '@/types';
import { BODY_FONTS, HEADING_FONTS } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function TypographySection({ config, onUpdate }: Props) {
    return (
        <div>
            <Label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2.5 mt-6 block font-mono">
                Typography
            </Label>

            <div className="mb-2.5">
                <div className="text-xs font-medium text-neutral-200 mb-1">Heading Font</div>
                <Select value={config.headingFont} onValueChange={(v) => onUpdate('headingFont', v)}>
                    <SelectTrigger className="w-full bg-neutral-800 border-white/[0.08] text-neutral-200 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {HEADING_FONTS.map((f) => (
                            <SelectItem key={f.name} value={f.name}>
                                {f.name} ({f.category})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-2.5">
                <div className="text-xs font-medium text-neutral-200 mb-1">Body Font</div>
                <Select value={config.bodyFont} onValueChange={(v) => onUpdate('bodyFont', v)}>
                    <SelectTrigger className="w-full bg-neutral-800 border-white/[0.08] text-neutral-200 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {BODY_FONTS.map((f) => (
                            <SelectItem key={f.name} value={f.name}>
                                {f.name} ({f.category})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
