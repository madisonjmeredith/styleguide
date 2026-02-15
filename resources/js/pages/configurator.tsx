import { useCallback, useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import type { StyleGuideConfig, StyleGuideData } from '@/types';
import { ConfigSidebar } from './configurator/config-sidebar';
import { DEFAULT_CONFIG, BODY_FONTS, HEADING_FONTS, googleFontsUrl } from './configurator/data';
import { PreviewPane } from './configurator/preview-pane';

type Props = {
    styleGuides: StyleGuideData[];
};

export default function Configurator({ styleGuides }: Props) {
    const { auth } = usePage().props;
    const [config, setConfig] = useState<StyleGuideConfig>(DEFAULT_CONFIG);
    const [activeGuideId, setActiveGuideId] = useState<number | null>(null);

    const handleUpdate = useCallback(<K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleLoadGuide = useCallback((guide: StyleGuideData) => {
        setConfig(guide.configuration);
        setActiveGuideId(guide.id);
    }, []);

    // Load Google Fonts dynamically
    useEffect(() => {
        const hf = HEADING_FONTS.find((f) => f.name === config.headingFont) || HEADING_FONTS[0];
        const bf = BODY_FONTS.find((f) => f.name === config.bodyFont) || BODY_FONTS[0];
        const url = googleFontsUrl([
            { name: hf.name, weights: hf.weights },
            { name: bf.name, weights: bf.weights },
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
    }, [config.headingFont, config.bodyFont]);

    return (
        <>
            <Head title="Style Guide Configurator" />
            <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                <ConfigSidebar
                    config={config}
                    onUpdate={handleUpdate}
                    user={auth.user}
                    styleGuides={styleGuides}
                    activeGuideId={activeGuideId}
                    onLoadGuide={handleLoadGuide}
                />
                <PreviewPane config={config} />
            </div>
        </>
    );
}
