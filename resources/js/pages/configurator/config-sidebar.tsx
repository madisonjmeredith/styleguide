import type { StyleGuideConfig, StyleGuideData, User } from '@/types';
import { ExportDialog } from './export-dialog';
import { SaveLoadControls } from './save-load-controls';
import { ColorSection } from './sections/color-section';
import { IconSection } from './sections/icon-section';
import { ButtonSection } from './sections/button-section';
import { LinkSection } from './sections/link-section';
import { SurfaceSection } from './sections/surface-section';
import { TransitionSection } from './sections/transition-section';
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
        <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Header */}
            <div className="-mx-6 flex shrink-0 items-center bg-gray-50 px-6 py-4">
                <div className="text-base font-semibold text-gray-900">Style Guide</div>
            </div>

            {/* Config Sections */}
            <nav className="flex flex-1 flex-col divide-y divide-gray-200">
                <ColorSection config={config} onUpdate={onUpdate} />
                <TypographySection config={config} onUpdate={onUpdate} />
                <IconSection config={config} onUpdate={onUpdate} />
                <SurfaceSection config={config} onUpdate={onUpdate} />
                <ButtonSection config={config} onUpdate={onUpdate} />
                <LinkSection config={config} onUpdate={onUpdate} />
                <TransitionSection config={config} onUpdate={onUpdate} />
            </nav>

            {/* Save & Export */}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                <SaveLoadControls
                    user={user}
                    styleGuides={styleGuides}
                    config={config}
                    activeGuideId={activeGuideId}
                    onLoadGuide={onLoadGuide}
                />
                <ExportDialog config={config} />
                <div className="text-xs text-gray-400 text-center">
                    Downloads a self-contained style guide
                </div>
            </div>
        </div>
    );
}
