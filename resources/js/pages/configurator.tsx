import { useCallback, useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import type { StyleGuideConfig, StyleGuideData } from '@/types';
import { ConfigSidebar } from './configurator/config-sidebar';
import { DEFAULT_CONFIG, googleFontsUrl, lookupFontMeta } from './configurator/data';
import { PreviewPane } from './configurator/preview-pane';

type Props = {
    styleGuides: StyleGuideData[];
};

export default function Configurator({ styleGuides }: Props) {
    const { auth } = usePage().props;
    const [config, setConfig] = useState<StyleGuideConfig>(() => {
        try {
            const saved = sessionStorage.getItem('styleguide:draft-config');
            return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
        } catch {
            return DEFAULT_CONFIG;
        }
    });
    const [activeGuideId, setActiveGuideId] = useState<number | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Persist config to localStorage so it survives the login round-trip
    useEffect(() => {
        sessionStorage.setItem('styleguide:draft-config', JSON.stringify(config));
    }, [config]);

    const handleUpdate = useCallback(<K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleLoadGuide = useCallback((guide: StyleGuideData) => {
        setConfig({ ...DEFAULT_CONFIG, ...guide.configuration });
        setActiveGuideId(guide.id);
    }, []);

    // Load Google Fonts dynamically
    useEffect(() => {
        const hfMeta = lookupFontMeta(config.headingFont, config.headingFontMeta);
        const bfMeta = lookupFontMeta(config.bodyFont, config.bodyFontMeta);
        const url = googleFontsUrl([
            { name: config.headingFont, weights: hfMeta.weights },
            { name: config.bodyFont, weights: bfMeta.weights },
        ]);
        const id = 'dynamic-fonts';
        let link = document.getElementById(id) as HTMLLinkElement | null;
        if (!link) {
            link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        link.href = url;
    }, [config.headingFont, config.bodyFont, config.headingFontMeta, config.bodyFontMeta]);

    const sidebarProps = {
        config,
        onUpdate: handleUpdate,
        user: auth.user,
        styleGuides,
        activeGuideId,
        onLoadGuide: handleLoadGuide,
    };

    return (
        <>
            <Head title="Style Guide Configurator" />
            <div className="flex h-screen flex-col">
                {/* Mobile sidebar dialog */}
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-sm flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <X aria-hidden="true" className="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>

                            <ConfigSidebar {...sidebarProps} />
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Desktop static sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
                    <ConfigSidebar {...sidebarProps} />
                </div>

                {/* Mobile top bar */}
                <div className="flex shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 py-3 shadow-xs lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="-m-2.5 p-2.5 text-gray-500 hover:text-gray-900"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu aria-hidden="true" className="size-6" />
                    </button>
                    <div className="text-base font-semibold text-gray-900">Style Guide</div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col overflow-hidden lg:pl-96">
                    <PreviewPane config={config} />
                </div>
            </div>
        </>
    );
}
