import { Link } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { NeoAlert } from '@/components/neo/neo-alert';
import { NeoButton } from '@/components/neo/neo-button';
import { NeoInput } from '@/components/neo/neo-input';
import { login, register } from '@/routes';
import type { StyleGuideConfig, StyleGuideData, User } from '@/types';
import { CheckCircle, Loader2, TriangleAlert } from 'lucide-react';
import { downloadZip } from './lib/download-file';
import { generateClaudeMd } from './lib/generate-claude-md';
import { generateHTML } from './lib/generate-html';
import { generateReadme } from './lib/generate-readme';
import { SaveLoadControls } from './save-load-controls';
import { ColorSection } from './sections/color-section';
import { IconSection } from './sections/icon-section';
import { ButtonSection } from './sections/button-section';
import { LinkSection } from './sections/link-section';
import { SurfaceSection } from './sections/surface-section';
import { TransitionSection } from './sections/transition-section';
import { TypographySection } from './sections/typography-section';

type SaveStatus = 'idle' | 'saving' | 'saved';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
    user: User | null;
    styleGuides: StyleGuideData[];
    activeGuideId: number | null;
    isEditing: boolean;
    saveStatus: SaveStatus;
};

export function ConfigSidebar({ config, onUpdate, user, styleGuides, activeGuideId, isEditing, saveStatus }: Props) {
    const handleExport = () => {
        downloadZip(
            [
                { name: 'style-guide.html', content: generateHTML(config) },
                { name: 'STYLE_GUIDE.md', content: generateClaudeMd(config) },
                { name: 'README.md', content: generateReadme() },
            ],
            'style-guide.zip',
        );
    };

    return (
        <div className="flex grow flex-col overflow-y-auto border-r-2 border-neo bg-white px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Saved guide banner */}
            {isEditing && (
                <div className="-mx-6 border-b-2 border-neo">
                    <NeoAlert variant="success" className="rounded-none border-x-0 border-t-0">
                        <CheckCircle className="size-4 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold">
                                {saveStatus === 'saving' ? 'Saving changes...' : 'Style guide saved'}
                            </p>
                            <p className="text-xs opacity-80">Edits are automatically saved</p>
                        </div>
                        {saveStatus === 'saving' && <Loader2 className="ml-auto size-3.5 shrink-0 animate-spin" />}
                    </NeoAlert>
                </div>
            )}

            {/* Unsaved warn banner */}
            {!isEditing && (
                <div className="-mx-6 border-b-2 border-neo">
                    <NeoAlert variant="warning" className="rounded-none border-x-0 border-t-0">
                        <TriangleAlert className="size-4 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold">Style guide not saved</p>
                            <p className="text-xs text-amber-700">
                                {user ? (
                                    'Save your style guide to keep your changes'
                                ) : (
                                    <>
                                        <TextLink href={register()}>Create an account</TextLink> to save your work
                                    </>
                                )}
                            </p>
                        </div>
                    </NeoAlert>
                </div>
            )}

            {/* Name */}
            <div className="py-4">
                <label htmlFor="styleguide-name" className="mb-1.5 block text-sm/6 font-semibold text-gray-700">
                    Name
                </label>
                <NeoInput
                    id="styleguide-name"
                    type="text"
                    value={config.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    placeholder="My Style Guide"
                />
            </div>

            {/* Config Sections */}
            <nav className="flex flex-1 flex-col divide-y-2 divide-neo/10">
                <ColorSection config={config} onUpdate={onUpdate} />
                <TypographySection config={config} onUpdate={onUpdate} />
                <IconSection config={config} onUpdate={onUpdate} />
                <SurfaceSection config={config} onUpdate={onUpdate} />
                <ButtonSection config={config} onUpdate={onUpdate} />
                <LinkSection config={config} onUpdate={onUpdate} />
                <TransitionSection config={config} onUpdate={onUpdate} />
            </nav>

            {/* Save & Export */}
            <div className="mt-4 space-y-3 border-t-2 border-neo/10 pt-4">
                {isEditing ? (
                    <NeoButton onClick={handleExport} className="w-full">
                        Export Style Guide
                    </NeoButton>
                ) : user ? (
                    <>
                        <NeoButton onClick={handleExport} className="w-full">
                            Export Style Guide
                        </NeoButton>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-neo/10" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-2 font-semibold text-gray-400">or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Save your style guide to your account to return to it later.
                        </p>

                        <SaveLoadControls styleGuides={styleGuides} config={config} activeGuideId={activeGuideId} />
                    </>
                ) : (
                    <>
                        <NeoButton onClick={handleExport} className="w-full">
                            Export Style Guide
                        </NeoButton>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-neo/10" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-2 font-semibold text-gray-400">or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Create an account to save your style guides and access them anytime.
                        </p>

                        <NeoButton asChild variant="secondary" className="w-full">
                            <Link href={register()}>Create an account</Link>
                        </NeoButton>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <TextLink href={login()}>Log in</TextLink>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
