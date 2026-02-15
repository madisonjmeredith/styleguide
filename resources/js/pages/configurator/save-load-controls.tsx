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
                className="flex items-center justify-center gap-1.5 w-full py-2 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
            >
                <LogIn className="size-3.5" />
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
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-neutral-200 bg-white/[0.06] hover:bg-white/10 border border-white/[0.08] rounded-md cursor-pointer transition-colors"
                >
                    <Save className="size-3.5" />
                    Save New
                </button>
                {activeGuideId && (
                    <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-indigo-300 bg-indigo-400/10 hover:bg-indigo-400/20 border border-indigo-400/30 rounded-md cursor-pointer transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Update'}
                    </button>
                )}
            </div>

            {styleGuides.length > 0 && (
                <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mt-2 font-mono">
                        Saved Guides
                    </div>
                    {styleGuides.map((guide) => (
                        <div
                            key={guide.id}
                            className={`flex items-center gap-2 py-1.5 px-2 rounded-md text-xs group ${
                                activeGuideId === guide.id
                                    ? 'bg-indigo-400/10 border border-indigo-400/30'
                                    : 'hover:bg-white/[0.04] border border-transparent'
                            }`}
                        >
                            <button
                                onClick={() => onLoadGuide(guide)}
                                className="flex-1 text-left text-neutral-200 truncate cursor-pointer bg-transparent border-none p-0 text-xs"
                            >
                                {guide.name}
                            </button>
                            <button
                                onClick={() => handleDelete(guide.id)}
                                className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400 cursor-pointer bg-transparent border-none p-0.5 transition-opacity"
                            >
                                <Trash2 className="size-3" />
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
