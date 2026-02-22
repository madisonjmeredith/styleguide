import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { NeoButton } from '@/components/neo/neo-button';
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
            <NeoButton onClick={handleSave} disabled={saving} className="w-full">
                {saving ? 'Saving...' : 'Save Style Guide'}
            </NeoButton>

            {styleGuides.length > 0 && (
                <div className="space-y-1">
                    <div className="mt-2 text-sm/6 font-semibold text-gray-700">Saved Guides</div>
                    {styleGuides.map((guide) => (
                        <div
                            key={guide.id}
                            className={`group flex items-center gap-2 rounded-[5px] border-2 px-2.5 py-1.5 text-sm ${
                                activeGuideId === guide.id
                                    ? 'border-neo bg-neo-light font-semibold'
                                    : 'border-transparent hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <Link
                                href={guidesShow(guide.id).url}
                                className="flex-1 truncate text-left text-sm text-gray-700 no-underline hover:text-gray-900"
                            >
                                {guide.name}
                            </Link>
                            <button
                                onClick={() => handleDelete(guide.id)}
                                className="cursor-pointer border-none bg-transparent p-0.5 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
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
