import { useCallback, useEffect, useRef, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { CheckCircle, X } from 'lucide-react';
import type { StyleGuideConfig, StyleGuideData } from '@/types';
import { ConfigSidebar } from './configurator/config-sidebar';
import { DEFAULT_CONFIG, googleFontsUrl, lookupFontMeta } from './configurator/data';
import { PreviewHeader } from './configurator/preview-header';
import { PreviewPane } from './configurator/preview-pane';

type SaveStatus = 'idle' | 'saving' | 'saved';

type Props = {
    styleGuides: StyleGuideData[];
    activeGuide?: StyleGuideData;
};

export default function Configurator({ styleGuides, activeGuide }: Props) {
    const { auth, flash } = usePage().props;
    const [config, setConfig] = useState<StyleGuideConfig>(() => {
        if (activeGuide) {
            return { ...DEFAULT_CONFIG, ...activeGuide.configuration, name: activeGuide.configuration.name || activeGuide.name };
        }

        try {
            const saved = sessionStorage.getItem('styleguide:draft-config');
            return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
        } catch {
            return DEFAULT_CONFIG;
        }
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const isInitialRender = useRef(true);
    const autosaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const savedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const isEditing = !!activeGuide;

    // Show success flash when it arrives (for initial save redirect)
    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    // Persist config to sessionStorage (only when not editing a saved guide)
    useEffect(() => {
        if (!isEditing) {
            sessionStorage.setItem('styleguide:draft-config', JSON.stringify(config));
        }
    }, [config, isEditing]);

    // Debounced autosave when editing an existing guide
    useEffect(() => {
        if (!isEditing) {
            return;
        }

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        clearTimeout(autosaveTimer.current);
        clearTimeout(savedTimer.current);

        autosaveTimer.current = setTimeout(() => {
            setSaveStatus('saving');
            router.put(
                `/configurator/${activeGuide.id}`,
                { name: config.name || activeGuide.name, configuration: config },
                {
                    preserveScroll: true,
                    preserveState: true,
                    showProgress: false,
                    only: ['styleGuides'],
                    onSuccess: () => {
                        setSaveStatus('saved');
                        savedTimer.current = setTimeout(() => setSaveStatus('idle'), 2000);
                    },
                    onError: () => {
                        setSaveStatus('idle');
                    },
                },
            );
        }, 1000);

        return () => {
            clearTimeout(autosaveTimer.current);
        };
    }, [config]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdate = useCallback(<K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
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
        activeGuideId: activeGuide?.id ?? null,
        isEditing,
        saveStatus,
    };

    return (
        <>
            <Head title="Style Guide Configurator" />
            <div className="flex h-screen flex-col">
                {/* Success toast */}
                {showSuccess && (
                    <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                        <CheckCircle className="size-4 shrink-0" />
                        {flash.success}
                    </div>
                )}

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

                {/* Main content */}
                <div className="flex flex-1 flex-col overflow-hidden lg:pl-96">
                    <PreviewHeader config={config} user={auth.user} isEditing={isEditing} onOpenSidebar={() => setSidebarOpen(true)} />
                    <PreviewPane config={config} />
                </div>
            </div>
        </>
    );
}
