import type { StyleGuideConfig } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faTriangleExclamation,
    faCircleXmark,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {
    faCircleCheck as farCircleCheck,
    faCircleXmark as farCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {
    CheckCircleIcon as CheckCircleIconMini,
    ExclamationTriangleIcon as ExclamationTriangleIconMini,
    XCircleIcon as XCircleIconMini,
    InformationCircleIcon as InformationCircleIconMini,
} from '@heroicons/react/20/solid';
import {
    CircleCheck as LucideCircleCheck,
    TriangleAlert as LucideTriangleAlert,
    CircleX as LucideCircleX,
    Info as LucideInfo,
} from 'lucide-react';
import { BODY_LINE_HEIGHT_VALUES, HEADING_LETTER_SPACING_VALUES, NEUTRAL_PRESETS, TYPE_SCALE_SIZES, lookupFontMeta, shade, tint } from './data';

const MATERIAL_SYMBOL_PATHS: Record<string, string> = {
    'check-circle': 'm421-389-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635-603L421-389Zm59 309q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z',
    'warning-triangle': 'M92-120q-9 0-15.65-4.13Q69.7-128.25 66-135q-4.17-6.6-4.58-14.3Q61-157 66-165l388-670q5-8 11.5-11.5T480-850q8 0 14.5 3.5T506-835l388 670q5 8 4.58 15.7-.41 7.7-4.58 14.3-3.7 6.75-10.35 10.87Q877-120 868-120H92Zm392.18-117q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5Zm0-111q12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-164q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v164q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63Z',
    'x-circle': 'm480-438 129 129q9 9 21 9t21-9q9-9 9-21t-9-21L522-480l129-129q9-9 9-21t-9-21q-9-9-21-9t-21 9L480-522 351-651q-9-9-21-9t-21 9q-9 9-9 21t9 21l129 129-129 129q-9 9-9 21t9 21q9 9 21 9t21-9l129-129Zm0 358q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z',
    'info-circle': 'M483.18-280q12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63Zm-3.2-314q14.02 0 23.52-9.2T513-626q0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2Zm.29 514q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Z',
};

const ALERT_VARIANTS = [
    {
        key: 'success',
        title: 'Changes saved',
        description: 'Your changes have been saved successfully.',
        bg: '#f0fdf4',
        iconColor: '#4ade80',
        titleColor: '#166534',
        bodyColor: '#15803d',
    },
    {
        key: 'warning',
        title: 'Attention needed',
        description: 'Your trial is expiring in 3 days.',
        bg: '#fefce8',
        iconColor: '#facc15',
        titleColor: '#854d0e',
        bodyColor: '#a16207',
    },
    {
        key: 'error',
        title: 'Something went wrong',
        description: 'There was a problem processing your request.',
        bg: '#fef2f2',
        iconColor: '#f87171',
        titleColor: '#991b1b',
        bodyColor: '#b91c1c',
    },
];

type Props = {
    config: StyleGuideConfig;
};

export function PreviewPane({ config }: Props) {
    const n = NEUTRAL_PRESETS[config.neutralFamily].values;
    const border = config.borderWidth === 0 ? `1px solid transparent` : `${config.borderWidth}px solid ${n[200]}`;
    const radius = config.radius;
    const shadow = config.shadowEnabled ? '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05)' : 'none';
    const hfMeta = lookupFontMeta(config.headingFont, config.headingFontMeta);
    const bfMeta = lookupFontMeta(config.bodyFont, config.bodyFontMeta);
    const hfFallback = hfMeta.category === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';
    const bfFallback = bfMeta.category === 'sans-serif' ? 'system-ui, sans-serif' : 'Georgia, serif';
    const headingFont = `'${config.headingFont}', ${hfFallback}`;
    const bodyFont = `'${config.bodyFont}', ${bfFallback}`;
    const ts = TYPE_SCALE_SIZES[config.typeScale ?? 'regular'];
    const primary = config.primaryColor;
    const secondary = config.secondaryColor;
    const headingFontWeight = config.headingFontWeight ?? 700;
    const bodyFontWeight = config.bodyFontWeight ?? 400;
    const headingLetterSpacing = HEADING_LETTER_SPACING_VALUES[config.headingLetterSpacing ?? 'normal'];
    const bodyLineHeight = BODY_LINE_HEIGHT_VALUES[config.bodyLineHeight ?? 'comfortable'];
    const headingTextTransform = (config.headingTextTransform ?? 'none') as React.CSSProperties['textTransform'];
    const buttonTextTransform = (config.buttonTextTransform ?? 'none') as React.CSSProperties['textTransform'];
    const isOutlineStyle = (config.buttonStyle ?? 'filled') === 'outline';
    const outlineBorderWidth = Math.max(config.borderWidth, 1);

    const linkColor = config.linkColor === 'secondary' ? secondary : primary;
    const linkHoverColor =
        config.linkHoverColor === 'darker' ? shade(linkColor, 0.25) : config.linkHoverColor === 'lighter' ? tint(linkColor, 0.3) : linkColor;
    const linkUnderline = config.linkUnderline !== false;
    const linkHoverUnderline =
        config.linkUnderlineOnHover === 'show' ? 'underline' : config.linkUnderlineOnHover === 'remove' ? 'none' : undefined;

    const renderAlertIcon = (alertKey: string, color: string) => {
        const size = 20;
        const faSize = size * 0.85;
        if (config.iconLibrary === 'fontawesome-solid') {
            const icon = alertKey === 'success' ? faCircleCheck : alertKey === 'warning' ? faTriangleExclamation : faCircleXmark;
            return <FontAwesomeIcon icon={icon} style={{ width: faSize, height: faSize, color }} />;
        }
        if (config.iconLibrary === 'fontawesome-regular') {
            const icon = alertKey === 'success' ? farCircleCheck : alertKey === 'warning' ? faTriangleExclamation : farCircleXmark;
            return <FontAwesomeIcon icon={icon} style={{ width: faSize, height: faSize, color }} />;
        }
        if (config.iconLibrary === 'heroicons') {
            const style = { width: size, height: size, color };
            if (alertKey === 'success') return <CheckCircleIconMini style={style} />;
            if (alertKey === 'warning') return <ExclamationTriangleIconMini style={style} />;
            return <XCircleIconMini style={style} />;
        }
        if (config.iconLibrary === 'lucide') {
            const props = { size, strokeWidth: 1.5, color };
            if (alertKey === 'success') return <LucideCircleCheck {...props} />;
            if (alertKey === 'warning') return <LucideTriangleAlert {...props} />;
            return <LucideCircleX {...props} />;
        }
        if (config.iconLibrary === 'material-symbols') {
            const pathKey = alertKey === 'success' ? 'check-circle' : alertKey === 'warning' ? 'warning-triangle' : 'x-circle';
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 -960 960 960" fill={color}>
                    <path d={MATERIAL_SYMBOL_PATHS[pathKey] ?? ''} />
                </svg>
            );
        }
        return null;
    };

    const renderInfoIcon = (color: string, size = 24) => {
        const faSize = size * 0.85;
        if (config.iconLibrary === 'fontawesome-solid') {
            return <FontAwesomeIcon icon={faCircleInfo} style={{ width: faSize, height: faSize, color }} />;
        }
        if (config.iconLibrary === 'fontawesome-regular') {
            return <FontAwesomeIcon icon={faCircleInfo} style={{ width: faSize, height: faSize, color }} />;
        }
        if (config.iconLibrary === 'heroicons') {
            return <InformationCircleIconMini style={{ width: size, height: size, color }} />;
        }
        if (config.iconLibrary === 'lucide') {
            return <LucideInfo size={size} strokeWidth={1.5} color={color} />;
        }
        if (config.iconLibrary === 'material-symbols') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 -960 960 960" fill={color}>
                    <path d={MATERIAL_SYMBOL_PATHS['info-circle'] ?? ''} />
                </svg>
            );
        }
        return null;
    };

    const labelStyle: React.CSSProperties = {
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: n[400],
        marginBottom: 10,
        fontFamily: bodyFont,
    };

    return (
        <div className="flex-1 flex flex-col bg-neutral-100 overflow-hidden">
            <div className="flex-1 overflow-auto p-5">
                <div className="max-w-[800px] mx-auto bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                    <style>{`
                        .preview-link {
                            color: ${linkColor};
                            text-decoration: ${linkUnderline ? 'underline' : 'none'};
                            text-underline-offset: 2px;
                            transition: color ${config.transitionDuration}ms ease, text-decoration-color ${config.transitionDuration}ms ease;
                        }
                        .preview-link:hover {
                            color: ${linkHoverColor};
                            ${linkHoverUnderline ? `text-decoration: ${linkHoverUnderline}; text-underline-offset: 2px;` : ''}
                        }
                        .preview-breadcrumb-link {
                            color: ${n[500]};
                            text-decoration: ${linkUnderline ? 'underline' : 'none'};
                            text-underline-offset: 2px;
                            transition: color ${config.transitionDuration}ms ease;
                        }
                        .preview-breadcrumb-link:hover {
                            color: ${n[700]};
                            ${linkHoverUnderline ? `text-decoration: ${linkHoverUnderline}; text-underline-offset: 2px;` : ''}
                        }
                        .preview-btn {
                            transition: all ${config.transitionDuration}ms ease;
                        }
                        .preview-btn-primary { background: ${isOutlineStyle ? 'transparent' : primary}; color: ${isOutlineStyle ? primary : '#fff'}; border: ${isOutlineStyle ? `${outlineBorderWidth}px solid ${primary}` : 'none'}; }
                        .preview-btn-secondary { background: ${isOutlineStyle ? 'transparent' : secondary}; color: ${isOutlineStyle ? secondary : '#fff'}; border: ${isOutlineStyle ? `${outlineBorderWidth}px solid ${secondary}` : 'none'}; }
                        .preview-btn-outline { background: transparent; }
                        ${config.buttonHoverStyle === 'darker' ? `.preview-btn-primary:hover { background: ${shade(primary, 0.15)};${isOutlineStyle ? ` color: #fff; border-color: ${shade(primary, 0.15)};` : ''} } .preview-btn-secondary:hover { background: ${shade(secondary, 0.15)};${isOutlineStyle ? ` color: #fff; border-color: ${shade(secondary, 0.15)};` : ''} } .preview-btn-outline:hover { background: ${n[100]}; }` : ''}
                        ${config.buttonHoverStyle === 'lighter' ? `.preview-btn-primary:hover { background: ${tint(primary, 0.2)};${isOutlineStyle ? ` color: #fff; border-color: ${tint(primary, 0.2)};` : ''} } .preview-btn-secondary:hover { background: ${tint(secondary, 0.2)};${isOutlineStyle ? ` color: #fff; border-color: ${tint(secondary, 0.2)};` : ''} } .preview-btn-outline:hover { background: ${n[50]}; }` : ''}
                        ${config.buttonHoverStyle === 'glow' ? `.preview-btn-primary:hover {${isOutlineStyle ? ` background: ${primary}; color: #fff; border-color: ${primary};` : ''} box-shadow: 0 0 0 4px ${tint(primary, 0.65)}; } .preview-btn-secondary:hover {${isOutlineStyle ? ` background: ${secondary}; color: #fff; border-color: ${secondary};` : ''} box-shadow: 0 0 0 4px ${tint(secondary, 0.65)}; } .preview-btn-outline:hover { box-shadow: 0 0 0 4px ${n[200]}; }` : ''}
                        ${config.buttonHoverStyle === 'lift' ? `${isOutlineStyle ? `.preview-btn-primary:hover { background: ${primary}; color: #fff; border-color: ${primary}; } .preview-btn-secondary:hover { background: ${secondary}; color: #fff; border-color: ${secondary}; } ` : ''}.preview-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }` : ''}
                    `}</style>
                    <div
                        style={{
                            fontFamily: bodyFont,
                            color: n[800],
                            background: n[50],
                            padding: 32,
                            overflowY: 'auto',
                        }}
                    >
                        {/* Style Guide Name */}
                        {config.name && (
                            <h1
                                style={{
                                    fontFamily: headingFont,
                                    fontSize: ts.h1 + 8,
                                    fontWeight: headingFontWeight,
                                    color: n[900],
                                    lineHeight: 1.2,
                                    letterSpacing: headingLetterSpacing,
                                    marginBottom: 24,
                                }}
                            >
                                {config.name}
                            </h1>
                        )}

                        {/* Typography */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Typography</div>
                            <div style={{ background: '#fff', border, borderRadius: radius, padding: 20 }}>
                                <h1
                                    style={{
                                        fontFamily: headingFont,
                                        fontSize: ts.h1,
                                        fontWeight: headingFontWeight,
                                        color: n[900],
                                        lineHeight: 1.2,
                                        letterSpacing: headingLetterSpacing,
                                        textTransform: headingTextTransform,
                                        marginBottom: 4,
                                    }}
                                >
                                    Heading One
                                </h1>
                                <h2
                                    style={{
                                        fontFamily: headingFont,
                                        fontSize: ts.h2,
                                        fontWeight: headingFontWeight,
                                        color: n[900],
                                        lineHeight: 1.25,
                                        letterSpacing: headingLetterSpacing,
                                        textTransform: headingTextTransform,
                                        marginBottom: 4,
                                    }}
                                >
                                    Heading Two
                                </h2>
                                <h3
                                    style={{
                                        fontFamily: headingFont,
                                        fontSize: ts.h3,
                                        fontWeight: headingFontWeight,
                                        color: n[900],
                                        lineHeight: 1.3,
                                        letterSpacing: headingLetterSpacing,
                                        textTransform: headingTextTransform,
                                        marginBottom: 12,
                                    }}
                                >
                                    Heading Three
                                </h3>
                                <p style={{ fontSize: ts.body, fontWeight: bodyFontWeight, color: n[700], lineHeight: bodyLineHeight, marginBottom: 8 }}>
                                    This is body text using the selected body font. It demonstrates comfortable reading size, generous line
                                    height, and softened color.
                                </p>
                                <p style={{ fontSize: ts.secondary, fontWeight: bodyFontWeight, color: n[500], lineHeight: 1.5, marginBottom: 8 }}>
                                    This is secondary text — smaller and lighter for captions and metadata.
                                </p>
                                <p style={{ fontSize: ts.body, fontWeight: bodyFontWeight, color: n[700] }}>
                                    Links look{' '}
                                    <a href="#" onClick={(e) => e.preventDefault()} className="preview-link">
                                        like this
                                    </a>{' '}
                                    inline.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Buttons</div>
                            <div
                                style={{
                                    background: '#fff',
                                    border,
                                    borderRadius: radius,
                                    padding: 20,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <button
                                    className="preview-btn preview-btn-primary"
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: ts.secondary,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        borderRadius: radius,
                                        textTransform: buttonTextTransform,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Primary
                                </button>
                                <button
                                    className="preview-btn preview-btn-secondary"
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: ts.secondary,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        borderRadius: radius,
                                        textTransform: buttonTextTransform,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Secondary
                                </button>
                                <button
                                    className="preview-btn preview-btn-outline"
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: ts.secondary,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        color: n[700],
                                        border,
                                        borderRadius: radius,
                                        textTransform: buttonTextTransform,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Outline
                                </button>
                                <button className="preview-link"
                                    style={{
                                        padding: '9px 8px',
                                        fontSize: ts.secondary,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: radius,
                                        textTransform: buttonTextTransform,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Text link
                                </button>
                                <button
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: ts.secondary,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: n[200],
                                        color: n[400],
                                        border: 'none',
                                        borderRadius: radius,
                                        textTransform: buttonTextTransform,
                                        cursor: 'not-allowed',
                                    }}
                                >
                                    Disabled
                                </button>
                            </div>
                        </div>

                        {/* Products */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Cards</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
                                {([
                                    { name: 'Basic Tee', price: '$35', color: 'Black', badge: 'New' },
                                    { name: 'Basic Tee', price: '$35', color: 'Aspen White' },
                                    { name: 'Basic Tee', price: '$35', color: 'Charcoal' },
                                    { name: 'Artwork Tee', price: '$35', color: 'Iso Dots' },
                                ] as const).map((product, i) => (
                                    <div key={i}>
                                        <div style={{ position: 'relative' }}>
                                            <div
                                                style={{
                                                    aspectRatio: '1 / 1',
                                                    width: '100%',
                                                    borderRadius: radius,
                                                    background: n[200],
                                                }}
                                            />
                                            {product.badge && (
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        left: 8,
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '2px 8px',
                                                        fontSize: ts.small - 1,
                                                        fontWeight: 500,
                                                        fontFamily: bodyFont,
                                                        borderRadius: radius,
                                                        background: tint(primary, 0.85),
                                                        color: primary,
                                                    }}
                                                >
                                                    {product.badge}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <h3 style={{ fontSize: ts.small, fontFamily: bodyFont, color: n[700], margin: 0 }}>
                                                    {product.name}
                                                </h3>
                                                <p style={{ marginTop: 2, fontSize: ts.small, fontFamily: bodyFont, color: n[500], margin: 0 }}>
                                                    {product.color}
                                                </p>
                                            </div>
                                            <p style={{ fontSize: ts.small, fontWeight: 500, fontFamily: bodyFont, color: n[900], margin: 0 }}>
                                                {product.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 24 }}>
                            <nav style={{ display: 'inline-flex', borderRadius: radius, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                                {([
                                    { type: 'prev' },
                                    { type: 'page', value: 1, active: true },
                                    { type: 'page', value: 2 },
                                    { type: 'page', value: 3 },
                                    { type: 'ellipsis' },
                                    { type: 'page', value: 8 },
                                    { type: 'page', value: 9 },
                                    { type: 'page', value: 10 },
                                    { type: 'next' },
                                ] as const).map((item, i, arr) => {
                                    const isFirst = i === 0;
                                    const isLast = i === arr.length - 1;
                                    const baseStyle: React.CSSProperties = {
                                        position: 'relative',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: ts.small,
                                        fontWeight: 600,
                                        fontFamily: bodyFont,
                                        marginLeft: i > 0 ? -1 : 0,
                                        boxShadow: `inset 0 0 0 1px ${n[300]}`,
                                        borderTopLeftRadius: isFirst ? radius : 0,
                                        borderBottomLeftRadius: isFirst ? radius : 0,
                                        borderTopRightRadius: isLast ? radius : 0,
                                        borderBottomRightRadius: isLast ? radius : 0,
                                        textDecoration: 'none',
                                        cursor: item.type === 'ellipsis' ? 'default' : 'pointer',
                                    };

                                    if (item.type === 'prev' || item.type === 'next') {
                                        return (
                                            <a
                                                key={item.type}
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                                style={{ ...baseStyle, padding: 8, color: n[400] }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
                                                    {item.type === 'prev' ? (
                                                        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                                    ) : (
                                                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                    )}
                                                </svg>
                                            </a>
                                        );
                                    }

                                    if (item.type === 'ellipsis') {
                                        return (
                                            <span key="ellipsis" style={{ ...baseStyle, padding: '8px 14px', color: n[500] }}>
                                                &hellip;
                                            </span>
                                        );
                                    }

                                    const isActive = 'active' in item && item.active;
                                    return (
                                        <a
                                            key={item.value}
                                            href="#"
                                            onClick={(e) => e.preventDefault()}
                                            style={{
                                                ...baseStyle,
                                                padding: '8px 14px',
                                                zIndex: isActive ? 10 : 0,
                                                background: isActive ? primary : 'transparent',
                                                color: isActive ? '#fff' : n[900],
                                                boxShadow: isActive ? 'none' : baseStyle.boxShadow,
                                            }}
                                        >
                                            {item.value}
                                        </a>
                                    );
                                })}
                            </nav>
                            </div>
                        </div>

                        {/* Sign In Card */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Form</div>
                            <div style={{ background: '#fff', border, borderRadius: radius, boxShadow: shadow, padding: 32, maxWidth: 400 }}>
                                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label
                                            style={{ display: 'block', fontSize: ts.small, fontWeight: 500, color: n[900], marginBottom: 6 }}
                                        >
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder=""
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                fontSize: ts.small,
                                                fontFamily: bodyFont,
                                                color: n[800],
                                                background: '#fff',
                                                border,
                                                borderRadius: radius,
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ display: 'block', fontSize: ts.small, fontWeight: 500, color: n[900], marginBottom: 6 }}
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder=""
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                fontSize: ts.small,
                                                fontFamily: bodyFont,
                                                color: n[800],
                                                background: '#fff',
                                                border,
                                                borderRadius: radius,
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                    <button
                                        className="preview-btn preview-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '9px 18px',
                                            fontSize: ts.small,
                                            fontWeight: 600,
                                            fontFamily: bodyFont,
                                            borderRadius: radius,
                                            textTransform: buttonTextTransform,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </form>
                                <p style={{ marginTop: 24, textAlign: 'center', fontSize: ts.small, marginBottom: 0 }}>
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        className="preview-link"
                                        style={{ fontWeight: 600 }}
                                    >
                                        Start a 14 day free trial
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Modal */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Modal</div>
                            <div
                                style={{
                                    background: '#fff',
                                    border,
                                    borderRadius: radius,
                                    boxShadow: config.shadowEnabled ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' : 'none',
                                    padding: 24,
                                    maxWidth: 480,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div
                                        style={{
                                            flexShrink: 0,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 9999,
                                            background: tint(primary, 0.85),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {renderInfoIcon(primary)}
                                    </div>
                                    <div style={{ marginLeft: 16, flex: 1 }}>
                                        <h3
                                            style={{
                                                fontSize: ts.body,
                                                fontWeight: 600,
                                                fontFamily: bodyFont,
                                                color: n[900],
                                                margin: 0,
                                            }}
                                        >
                                            Publish changes
                                        </h3>
                                        <p
                                            style={{
                                                marginTop: 8,
                                                fontSize: ts.small,
                                                fontFamily: bodyFont,
                                                color: n[500],
                                                lineHeight: 1.5,
                                                margin: 0,
                                                marginBottom: 0,
                                            }}
                                        >
                                            Your updates will be visible to all team members once published. You can review changes before they go live.
                                        </p>
                                    </div>
                                </div>
                                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
                                    <button
                                        className="preview-link"
                                        style={{
                                            padding: '6px 8px',
                                            fontSize: ts.small,
                                            fontWeight: 600,
                                            fontFamily: bodyFont,
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="preview-btn preview-btn-primary"
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: ts.small,
                                            fontWeight: 600,
                                            fontFamily: bodyFont,
                                            borderRadius: radius,
                                            textTransform: buttonTextTransform,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Alerts */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Alerts</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {ALERT_VARIANTS.map((alert) => (
                                    <div
                                        key={alert.key}
                                        style={{
                                            borderRadius: radius,
                                            background: alert.bg,
                                            padding: 16,
                                        }}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 1 }}>
                                                {renderAlertIcon(alert.key, alert.iconColor)}
                                            </div>
                                            <div style={{ marginLeft: 12 }}>
                                                <h3
                                                    style={{
                                                        fontSize: ts.small,
                                                        fontWeight: 500,
                                                        fontFamily: bodyFont,
                                                        color: alert.titleColor,
                                                        lineHeight: 1.25,
                                                        margin: 0,
                                                    }}
                                                >
                                                    {alert.title}
                                                </h3>
                                                <div
                                                    style={{
                                                        marginTop: 4,
                                                        fontSize: ts.small,
                                                        fontFamily: bodyFont,
                                                        color: alert.bodyColor,
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {alert.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Breadcrumbs */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Breadcrumbs</div>
                            <nav style={{ display: 'flex' }}>
                                <ol style={{ display: 'flex', alignItems: 'center', gap: 16, listStyle: 'none', margin: 0, padding: 0 }}>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e) => e.preventDefault()}
                                            className="preview-breadcrumb-link"
                                            style={{ fontSize: ts.small, fontFamily: bodyFont, fontWeight: 500 }}
                                        >
                                            Home
                                        </a>
                                    </li>
                                    {([
                                        { name: 'Dashboard', current: false },
                                        { name: 'Settings', current: true },
                                    ] as const).map((page) => (
                                        <li key={page.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill={n[400]} style={{ flexShrink: 0 }}>
                                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                            </svg>
                                            {page.current ? (
                                                <span
                                                    style={{
                                                        fontSize: ts.small,
                                                        fontFamily: bodyFont,
                                                        fontWeight: 500,
                                                        color: n[700],
                                                    }}
                                                >
                                                    {page.name}
                                                </span>
                                            ) : (
                                                <a
                                                    href="#"
                                                    onClick={(e) => e.preventDefault()}
                                                    className="preview-breadcrumb-link"
                                                    style={{
                                                        fontSize: ts.small,
                                                        fontFamily: bodyFont,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {page.name}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>

                        {/* Table */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Table</div>
                            <div style={{ background: '#fff', border, borderRadius: radius, overflow: 'hidden', boxShadow: shadow }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: ts.small }}>
                                    <thead>
                                        <tr>
                                            {['Name', 'Title', 'Email', 'Role', ''].map((th, i) => (
                                                <th
                                                    key={i}
                                                    style={{
                                                        textAlign: 'left',
                                                        padding: '12px 12px',
                                                        fontSize: ts.small,
                                                        fontWeight: 600,
                                                        color: n[900],
                                                        background: n[50],
                                                        borderBottom: `1px solid ${n[300]}`,
                                                    }}
                                                >
                                                    {th}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {([
                                            { name: 'Maya Johnson', title: 'Software Engineer', email: 'maya.johnson@example.com', role: 'Admin' },
                                            { name: 'James Park', title: 'Product Manager', email: 'james.park@example.com', role: 'Member' },
                                            { name: 'Sara Nilsson', title: 'UX Designer', email: 'sara.nilsson@example.com', role: 'Member' },
                                            { name: 'David Chen', title: 'Data Analyst', email: 'david.chen@example.com', role: 'Owner' },
                                        ] as const).map((person, i, arr) => (
                                            <tr key={person.email}>
                                                <td
                                                    style={{
                                                        padding: '14px 12px',
                                                        fontWeight: 500,
                                                        color: n[900],
                                                        whiteSpace: 'nowrap',
                                                        borderBottom: i < arr.length - 1 ? `1px solid ${n[200]}` : 'none',
                                                    }}
                                                >
                                                    {person.name}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '14px 12px',
                                                        color: n[500],
                                                        whiteSpace: 'nowrap',
                                                        borderBottom: i < arr.length - 1 ? `1px solid ${n[200]}` : 'none',
                                                    }}
                                                >
                                                    {person.title}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '14px 12px',
                                                        color: n[500],
                                                        whiteSpace: 'nowrap',
                                                        borderBottom: i < arr.length - 1 ? `1px solid ${n[200]}` : 'none',
                                                    }}
                                                >
                                                    {person.email}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '14px 12px',
                                                        color: n[500],
                                                        whiteSpace: 'nowrap',
                                                        borderBottom: i < arr.length - 1 ? `1px solid ${n[200]}` : 'none',
                                                    }}
                                                >
                                                    {person.role}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '14px 12px',
                                                        textAlign: 'right',
                                                        whiteSpace: 'nowrap',
                                                        borderBottom: i < arr.length - 1 ? `1px solid ${n[200]}` : 'none',
                                                    }}
                                                >
                                                    <a
                                                        href="#"
                                                        onClick={(e) => e.preventDefault()}
                                                        className="preview-link"
                                                        style={{ fontWeight: 500 }}
                                                    >
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
