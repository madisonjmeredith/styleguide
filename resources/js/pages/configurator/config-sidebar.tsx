import { Link } from '@inertiajs/react';
import type { StyleGuideConfig, StyleGuideData, User } from '@/types';
import { ExportDialog } from './export-dialog';
import { SaveLoadControls } from './save-load-controls';
import { ColorSection } from './sections/color-section';
import { IconSection } from './sections/icon-section';
import { SurfaceSection } from './sections/surface-section';
import { TypographySection } from './sections/typography-section';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
    user: User | null;
    styleGuides: StyleGuideData[];
    activeGuideId: number | null;
    onLoadGuide: (guide: StyleGuideData) => void;
};

export function ConfigSidebar({ config, onUpdate, user, styleGuides, activeGuideId, onLoadGuide }: Props) {
    return (
        <div className="w-80 shrink-0 bg-neutral-950 text-neutral-200 overflow-y-auto flex flex-col border-r border-white/[0.06]"
            style={{ padding: '20px 16px' }}
        >
            {/* Header */}
            <div className="mb-5 pb-4 border-b border-white/[0.06]">
                <Link href="/" className="block no-underline">
                    <div className="text-[15px] font-bold text-white tracking-tight">
                        <span className="text-indigo-400">&#9670;</span> Style Guide
                    </div>
                </Link>
                <div className="text-[11px] text-neutral-500 mt-0.5">Configure your design tokens</div>
            </div>

            {/* Config Sections */}
            <div className="flex-1">
                <ColorSection config={config} onUpdate={onUpdate} />
                <TypographySection config={config} onUpdate={onUpdate} />
                <IconSection config={config} onUpdate={onUpdate} />
                <SurfaceSection config={config} onUpdate={onUpdate} />
            </div>

            {/* Save & Export */}
            <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-3">
                <SaveLoadControls
                    user={user}
                    styleGuides={styleGuides}
                    config={config}
                    activeGuideId={activeGuideId}
                    onLoadGuide={onLoadGuide}
                />
                <ExportDialog config={config} />
                <div className="text-[10px] text-neutral-500 text-center">
                    Downloads a self-contained style guide
                </div>
            </div>
        </div>
    );
}
