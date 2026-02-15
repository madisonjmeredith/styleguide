import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StyleGuideConfig, StyleGuideData, User } from '@/types';
import { LogIn, Save, Trash2 } from 'lucide-react';

type Props = {
    user: User | null;
    styleGuides: StyleGuideData[];
    config: StyleGuideConfig;
    activeGuideId: number | null;
    onLoadGuide: (guide: StyleGuideData) => void;
};

export function SaveLoadControls({ user, styleGuides, config, activeGuideId, onLoadGuide }: Props) {
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [guideName, setGuideName] = useState('');
    const [saving, setSaving] = useState(false);

    if (!user) {
        return (
            <a
                href="/login"
                className="flex items-center justify-center gap-1.5 w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
                <LogIn className="size-4" />
                Log in to save guides
            </a>
        );
    }

    const handleSave = () => {
        if (!guideName.trim()) {
            return;
        }

        setSaving(true);
        router.post(
            '/configurator',
            { name: guideName, configuration: config },
            {
                preserveScroll: true,
                onFinish: () => {
                    setSaving(false);
                    setSaveDialogOpen(false);
                    setGuideName('');
                },
            },
        );
    };

    const handleUpdate = () => {
        if (!activeGuideId) {
            return;
        }

        setSaving(true);
        const activeGuide = styleGuides.find((g) => g.id === activeGuideId);
        router.put(
            `/configurator/${activeGuideId}`,
            { name: activeGuide?.name ?? 'Untitled', configuration: config },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    };

    const handleDelete = (id: number) => {
        router.delete(`/configurator/${id}`, { preserveScroll: true });
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-1.5">
                <button
                    onClick={() => setSaveDialogOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm/6 font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-md cursor-pointer transition-colors"
                >
                    <Save className="size-4" />
                    Save New
                </button>
                {activeGuideId && (
                    <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm/6 font-medium text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 rounded-md cursor-pointer transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Update'}
                    </button>
                )}
            </div>

            {styleGuides.length > 0 && (
                <div className="space-y-1">
                    <div className="text-sm font-semibold text-gray-900 mt-2">
                        Saved Guides
                    </div>
                    {styleGuides.map((guide) => (
                        <div
                            key={guide.id}
                            className={`flex items-center gap-2 py-1.5 px-2.5 rounded-md text-sm group ${
                                activeGuideId === guide.id
                                    ? 'bg-green-50 border border-green-200'
                                    : 'hover:bg-gray-50 border border-transparent'
                            }`}
                        >
                            <button
                                onClick={() => onLoadGuide(guide)}
                                className="flex-1 text-left text-gray-700 truncate cursor-pointer bg-transparent border-none p-0 text-sm"
                            >
                                {guide.name}
                            </button>
                            <button
                                onClick={() => handleDelete(guide.id)}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 cursor-pointer bg-transparent border-none p-0.5 transition-opacity"
                            >
                                <Trash2 className="size-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Save Style Guide</DialogTitle>
                        <DialogDescription>Give your style guide a name to save it to your account.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="guide-name">Name</Label>
                            <Input
                                id="guide-name"
                                value={guideName}
                                onChange={(e) => setGuideName(e.target.value)}
                                placeholder="My Project Style Guide"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSave();
                                    }
                                }}
                            />
                        </div>
                        <Button onClick={handleSave} disabled={saving || !guideName.trim()} className="w-full">
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
