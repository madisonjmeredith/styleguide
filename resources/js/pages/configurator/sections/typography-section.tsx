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
            <Label className="text-xs/6 font-semibold text-gray-400 mb-3 mt-6 block">
                Typography
            </Label>

            <div className="mb-3">
                <div className="text-sm/6 font-medium text-gray-700 mb-1">Heading Font</div>
                <Select value={config.headingFont} onValueChange={(v) => onUpdate('headingFont', v)}>
                    <SelectTrigger className="w-full text-sm">
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

            <div className="mb-3">
                <div className="text-sm/6 font-medium text-gray-700 mb-1">Body Font</div>
                <Select value={config.bodyFont} onValueChange={(v) => onUpdate('bodyFont', v)}>
                    <SelectTrigger className="w-full text-sm">
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
