import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { show as guidesShow } from '@/routes/guides';
import type { StyleGuideConfig, StyleGuideData } from '@/types';
import { Trash2 } from 'lucide-react';

type Props = {
    styleGuides: StyleGuideData[];
    config: StyleGuideConfig;
    activeGuideId: number | null;
};

export function SaveLoadControls({ styleGuides, config, activeGuideId }: Props) {
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        router.post(
            '/configurator',
            { name: config.name || null, configuration: config },
            {
                onFinish: () => setSaving(false),
            },
        );
    };

    const handleDelete = (id: number) => {
        router.delete(`/configurator/${id}`, { preserveScroll: true });
    };

    return (
        <div className="space-y-2">
            <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? 'Saving...' : 'Save Style Guide'}
            </Button>

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
                            <Link
                                href={guidesShow(guide.id).url}
                                className="flex-1 text-left text-gray-700 truncate text-sm no-underline hover:text-gray-900"
                            >
                                {guide.name}
                            </Link>
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
        </div>
    );
}
