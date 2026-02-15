import { Link } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { login, register } from '@/routes';
import type { StyleGuideConfig, StyleGuideData, User } from '@/types';
import { CheckCircle, Loader2, TriangleAlert } from 'lucide-react';
import { ExportDialog } from './export-dialog';
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
    return (
        <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Header */}
            <div className="-mx-6 flex shrink-0 items-center justify-between bg-gray-50 px-6 py-4">
                <div className="text-base font-semibold text-gray-900">Style Guide</div>
            </div>

            {/* Saved guide banner */}
            {isEditing && (
                <div className="-mx-6 flex items-center gap-2.5 border-b border-green-100 bg-green-50/60 px-6 py-3">
                    <CheckCircle className="size-4 shrink-0 text-green-600" />
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-green-800">
                            {saveStatus === 'saving' ? 'Saving changes…' : 'Style guide saved'}
                        </p>
                        <p className="text-xs text-green-600">Edits are automatically saved</p>
                    </div>
                    {saveStatus === 'saving' && <Loader2 className="ml-auto size-3.5 shrink-0 animate-spin text-green-600" />}
                </div>
            )}

            {/* Unsaved warn banner */}
            {!isEditing && (
                <div className="-mx-6 flex items-center gap-2.5 border-b border-amber-100 bg-amber-50/60 px-6 py-3">
                    <TriangleAlert className="size-4 shrink-0 text-amber-600" />
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-amber-800">Style guide not saved</p>
                        <p className="text-xs text-amber-600">
                            {user ? (
                                'Save your style guide to keep your changes'
                            ) : (
                                <><TextLink href={register()}>Create an account</TextLink> to save your work</>
                            )}
                        </p>
                    </div>
                </div>
            )}

            {/* Name */}
            <div className="py-4">
                <label htmlFor="styleguide-name" className="mb-1.5 block text-xs font-medium text-gray-500">
                    Name
                </label>
                <input
                    id="styleguide-name"
                    type="text"
                    value={config.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    placeholder="My Style Guide"
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
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
                {isEditing ? (
                    <ExportDialog config={config} />
                ) : user ? (
                    <>
                        <ExportDialog config={config} />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-2 text-gray-400">or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Save your style guide to your account to return to it later.
                        </p>

                        <SaveLoadControls
                            styleGuides={styleGuides}
                            config={config}
                            activeGuideId={activeGuideId}
                        />
                    </>
                ) : (
                    <>
                        <ExportDialog config={config} />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-2 text-gray-400">or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Create an account to save your style guides and access them anytime.
                        </p>

                        <Button asChild className="w-full">
                            <Link href={register()}>Create an account</Link>
                        </Button>

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
