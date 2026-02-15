import type { StyleGuideConfig } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faMagnifyingGlass,
    faUser,
    faHeart,
    faGear,
    faEnvelope,
    faBell,
    faStar,
    faPlus,
    faArrowRight,
    faCheck,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHouse as farHouse,
    faUser as farUser,
    faHeart as farHeart,
    faSun as farSun,
    faEnvelope as farEnvelope,
    faBell as farBell,
    faStar as farStar,
    faSquarePlus as farSquarePlus,
    faCircleRight as farCircleRight,
    faCircleCheck as farCircleCheck,
    faCircleXmark as farCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    UserIcon,
    HeartIcon,
    Cog6ToothIcon,
    EnvelopeIcon,
    BellIcon,
    StarIcon,
    PlusIcon,
    ArrowRightIcon,
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    Home as LucideHome,
    Search as LucideSearch,
    User as LucideUser,
    Heart as LucideHeart,
    Settings as LucideSettings,
    Mail as LucideMail,
    Bell as LucideBell,
    Star as LucideStar,
    Plus as LucidePlus,
    ArrowRight as LucideArrowRight,
    Check as LucideCheck,
    X as LucideX,
} from 'lucide-react';
import { BODY_LINE_HEIGHT_VALUES, HEADING_LETTER_SPACING_VALUES, ICON_PREVIEW_SET, NEUTRAL_PRESETS, TYPE_SCALE_SIZES, lookupFontMeta, shade, tint } from './data';

const MATERIAL_SYMBOL_PATHS: Record<string, string> = {
    home: 'M220-180h150v-220q0-12.75 8.63-21.38Q387.25-430 400-430h160q12.75 0 21.38 8.62Q590-412.75 590-400v220h150v-390L480-765 220-570v390Zm-60 0v-390q0-14.25 6.38-27 6.37-12.75 17.62-21l260-195q15.68-12 35.84-12Q500-825 516-813l260 195q11.25 8.25 17.63 21 6.37 12.75 6.37 27v390q0 24.75-17.62 42.37Q764.75-120 740-120H560q-12.75 0-21.37-8.63Q530-137.25 530-150v-220H430v220q0 12.75-8.62 21.37Q412.75-120 400-120H220q-24.75 0-42.37-17.63Q160-155.25 160-180Zm320-293Z',
    search: 'M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z',
    user: 'M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v34q0 24.75-17.62 42.37Q764.75-160 740-160H220q-24.75 0-42.37-17.63Q160-195.25 160-220Zm60 0h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z',
    heart: 'M480-140q-10.7 0-21.78-3.87-11.08-3.87-19.49-12.38L386-205Q262-320 171-424.5T80-643q0-90.15 60.5-150.58Q201-854 290-854q51 0 101 24.5t89 80.5q44-56 91-80.5t99-24.5q89 0 149.5 60.42Q880-733.15 880-643q0 114-91 218.5T574-205l-53 49q-8.25 8.38-19.12 12.19Q491-140 480-140Zm-26-543q-27-49-71-80t-93-31q-66 0-108 42.5t-42 108.93q0 57.57 38.88 121.22 38.88 63.66 93 123.5Q326-338 384-286.5q58 51.5 96 86.5 38-34 96-86t112-112.5q54-60.5 93-124.19T820-643q0-66-42.5-108.5T670-794q-50 0-93.5 30.5T504-683q-5 8-11 11.5t-14 3.5q-8 0-14.5-3.5T454-683Zm26 186Z',
    settings: 'M421-80q-14 0-25-9t-13-23l-15-94q-19-7-40-19t-37-25l-86 40q-14 6-28 1.5T155-226L97-330q-8-13-4.5-27t15.5-23l80-59q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521l-80-59q-12-9-15.5-23t4.5-27l58-104q8-13 22-17.5t28 1.5l86 40q16-13 37-25t40-18l15-95q2-14 13-23t25-9h118q14 0 25 9t13 23l15 94q19 7 40.5 18.5T669-710l86-40q14-6 27.5-1.5T804-734l59 104q8 13 4.5 27.5T852-580l-80 57q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l80 58q12 8 15.5 22.5T863-330l-58 104q-8 13-22 17.5t-28-1.5l-86-40q-16 13-36.5 25.5T592-206l-15 94q-2 14-13 23t-25 9H421Zm15-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z',
    mail: 'M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm680-525L496-473q-4 2-7.5 3.5T480-468q-5 0-8.5-1.5T464-473L140-685v465h680v-465ZM480-522l336-218H145l335 218ZM140-685v7-39.32.73V-740v23-.91V-678v-7 465-465Z',
    bell: 'M190-200q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H190Zm290-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z',
    star: 'm323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm157-24L294-157q-8 5-17 4.5t-16-5.5q-7-5-10.5-13t-1.5-18l49-212-164-143q-8-7-9.5-15.5t.5-16.5q2-8 9-13.5t17-6.5l217-19 84-200q4-9 12-13.5t16-4.5q8 0 16 4.5t12 13.5l84 200 217 19q10 1 17 6.5t9 13.5q2 8 .5 16.5T826-544L662-401l49 212q2 10-1.5 18T699-158q-7 5-16 5.5t-17-4.5L480-269Zm0-206Z',
    plus: 'M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z',
    'arrow-right': 'M686-450H190q-13 0-21.5-8.5T160-480q0-13 8.5-21.5T190-510h496L459-737q-9-9-9-21t9-21q9-9 21-9t21 9l278 278q5 5 7 10t2 11q0 6-2 11t-7 10L501-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l227-227Z',
    check: 'm378-332 363-363q9.27-9 21.64-9 12.36 0 21.36 9.05 9 9.06 9 21.5 0 12.45-9 21.45L399-267q-9 9-21 9t-21-9L175-449q-9-9.07-8.5-21.53.5-12.47 9.55-21.47 9.06-9 21.5-9 12.45 0 21.45 9l159 160Z',
    close: 'M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z',
};

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

    const linkColor = config.linkColor === 'secondary' ? secondary : primary;
    const linkHoverColor =
        config.linkHoverColor === 'darker' ? shade(linkColor, 0.25) : config.linkHoverColor === 'lighter' ? tint(linkColor, 0.3) : linkColor;
    const linkUnderline = config.linkUnderline !== false;
    const linkHoverUnderline =
        config.linkUnderlineOnHover === 'show' ? 'underline' : config.linkUnderlineOnHover === 'remove' ? 'none' : undefined;

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
                        .preview-btn {
                            transition: all ${config.transitionDuration}ms ease;
                        }
                        .preview-btn-primary { background: ${primary}; }
                        .preview-btn-secondary { background: ${secondary}; }
                        .preview-btn-outline { background: transparent; }
                        ${config.buttonHoverStyle === 'darker' ? `.preview-btn-primary:hover { background: ${shade(primary, 0.15)}; } .preview-btn-secondary:hover { background: ${shade(secondary, 0.15)}; } .preview-btn-outline:hover { background: ${n[100]}; }` : ''}
                        ${config.buttonHoverStyle === 'lighter' ? `.preview-btn-primary:hover { background: ${tint(primary, 0.2)}; } .preview-btn-secondary:hover { background: ${tint(secondary, 0.2)}; } .preview-btn-outline:hover { background: ${n[50]}; }` : ''}
                        ${config.buttonHoverStyle === 'glow' ? `.preview-btn-primary:hover { box-shadow: 0 0 0 4px ${tint(primary, 0.65)}; } .preview-btn-secondary:hover { box-shadow: 0 0 0 4px ${tint(secondary, 0.65)}; } .preview-btn-outline:hover { box-shadow: 0 0 0 4px ${n[200]}; }` : ''}
                        ${config.buttonHoverStyle === 'lift' ? `.preview-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }` : ''}
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
                                        color: '#fff',
                                        border: 'none',
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
                                        color: '#fff',
                                        border: 'none',
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

                        {/* Icons */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Icons</div>
                            <div style={{ fontSize: 10, color: n[400], marginBottom: 8, marginTop: -6, fontFamily: bodyFont }}>
                                {config.iconLibrary === 'fontawesome-solid'
                                    ? 'Font Awesome · Solid'
                                    : config.iconLibrary === 'fontawesome-regular'
                                      ? 'Font Awesome · Regular'
                                      : config.iconLibrary === 'heroicons'
                                        ? 'Heroicons · Outline'
                                        : config.iconLibrary === 'material-symbols'
                                          ? 'Material Symbols · Rounded'
                                          : 'Lucide Icons'}
                            </div>
                            <div
                                style={{
                                    background: '#fff',
                                    border,
                                    borderRadius: radius,
                                    boxShadow: shadow,
                                    padding: 20,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(6, 1fr)',
                                    gap: 12,
                                }}
                            >
                                {ICON_PREVIEW_SET.map((icon) => (
                                    <div
                                        key={icon.key}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}
                                    >
                                        <div style={{ color: n[700], width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {config.iconLibrary === 'fontawesome-solid' && (
                                                <FontAwesomeIcon
                                                    icon={
                                                        icon.key === 'home' ? faHome
                                                            : icon.key === 'search' ? faMagnifyingGlass
                                                            : icon.key === 'user' ? faUser
                                                            : icon.key === 'heart' ? faHeart
                                                            : icon.key === 'settings' ? faGear
                                                            : icon.key === 'mail' ? faEnvelope
                                                            : icon.key === 'bell' ? faBell
                                                            : icon.key === 'star' ? faStar
                                                            : icon.key === 'plus' ? faPlus
                                                            : icon.key === 'arrow-right' ? faArrowRight
                                                            : icon.key === 'check' ? faCheck
                                                            : faXmark
                                                    }
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            )}
                                            {config.iconLibrary === 'fontawesome-regular' && (
                                                <FontAwesomeIcon
                                                    icon={
                                                        icon.key === 'home' ? farHouse
                                                            : icon.key === 'search' ? faMagnifyingGlass
                                                            : icon.key === 'user' ? farUser
                                                            : icon.key === 'heart' ? farHeart
                                                            : icon.key === 'settings' ? farSun
                                                            : icon.key === 'mail' ? farEnvelope
                                                            : icon.key === 'bell' ? farBell
                                                            : icon.key === 'star' ? farStar
                                                            : icon.key === 'plus' ? farSquarePlus
                                                            : icon.key === 'arrow-right' ? farCircleRight
                                                            : icon.key === 'check' ? farCircleCheck
                                                            : farCircleXmark
                                                    }
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            )}
                                            {config.iconLibrary === 'heroicons' && (() => {
                                                const iconProps = { style: { width: 22, height: 22 } };
                                                switch (icon.key) {
                                                    case 'home': return <HomeIcon {...iconProps} />;
                                                    case 'search': return <MagnifyingGlassIcon {...iconProps} />;
                                                    case 'user': return <UserIcon {...iconProps} />;
                                                    case 'heart': return <HeartIcon {...iconProps} />;
                                                    case 'settings': return <Cog6ToothIcon {...iconProps} />;
                                                    case 'mail': return <EnvelopeIcon {...iconProps} />;
                                                    case 'bell': return <BellIcon {...iconProps} />;
                                                    case 'star': return <StarIcon {...iconProps} />;
                                                    case 'plus': return <PlusIcon {...iconProps} />;
                                                    case 'arrow-right': return <ArrowRightIcon {...iconProps} />;
                                                    case 'check': return <CheckIcon {...iconProps} />;
                                                    case 'close': return <XMarkIcon {...iconProps} />;
                                                    default: return null;
                                                }
                                            })()}
                                            {config.iconLibrary === 'lucide' && (() => {
                                                const iconProps = { size: 20, strokeWidth: 1.5 };
                                                switch (icon.key) {
                                                    case 'home': return <LucideHome {...iconProps} />;
                                                    case 'search': return <LucideSearch {...iconProps} />;
                                                    case 'user': return <LucideUser {...iconProps} />;
                                                    case 'heart': return <LucideHeart {...iconProps} />;
                                                    case 'settings': return <LucideSettings {...iconProps} />;
                                                    case 'mail': return <LucideMail {...iconProps} />;
                                                    case 'bell': return <LucideBell {...iconProps} />;
                                                    case 'star': return <LucideStar {...iconProps} />;
                                                    case 'plus': return <LucidePlus {...iconProps} />;
                                                    case 'arrow-right': return <LucideArrowRight {...iconProps} />;
                                                    case 'check': return <LucideCheck {...iconProps} />;
                                                    case 'close': return <LucideX {...iconProps} />;
                                                    default: return null;
                                                }
                                            })()}
                                            {config.iconLibrary === 'material-symbols' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 -960 960 960" fill="currentColor">
                                                    <path d={MATERIAL_SYMBOL_PATHS[icon.key] ?? ''} />
                                                </svg>
                                            )}
                                        </div>
                                        <div style={{ fontSize: ts.small - 2, color: n[500], fontFamily: bodyFont }}>{icon.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cards */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Cards</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div style={{ background: '#fff', border, borderRadius: radius, boxShadow: shadow, overflow: 'hidden' }}>
                                    <div style={{ padding: 16 }}>
                                        <div
                                            style={{
                                                fontFamily: headingFont,
                                                fontSize: ts.secondary + 2,
                                                fontWeight: headingFontWeight,
                                                color: n[900],
                                                letterSpacing: headingLetterSpacing,
                                                textTransform: headingTextTransform,
                                                marginBottom: 4,
                                            }}
                                        >
                                            Basic Card
                                        </div>
                                        <div style={{ fontSize: ts.small, color: n[600], lineHeight: 1.5 }}>
                                            A simple card with title and body text.
                                        </div>
                                    </div>
                                </div>
                                <div style={{ background: '#fff', border, borderRadius: radius, boxShadow: shadow, overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: 80,
                                            background: `linear-gradient(135deg, ${tint(primary, 0.7)}, ${tint(secondary, 0.7)})`,
                                        }}
                                    />
                                    <div style={{ padding: 16 }}>
                                        <div
                                            style={{
                                                fontFamily: headingFont,
                                                fontSize: ts.secondary + 2,
                                                fontWeight: headingFontWeight,
                                                color: n[900],
                                                letterSpacing: headingLetterSpacing,
                                                textTransform: headingTextTransform,
                                                marginBottom: 4,
                                            }}
                                        >
                                            With Image
                                        </div>
                                        <div style={{ fontSize: ts.small, color: n[600], lineHeight: 1.5 }}>
                                            Card with a header image area.
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        background: '#fff',
                                        border,
                                        borderRadius: radius,
                                        boxShadow: shadow,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div style={{ padding: 16, flex: 1 }}>
                                        <div
                                            style={{
                                                fontFamily: headingFont,
                                                fontSize: ts.secondary + 2,
                                                fontWeight: headingFontWeight,
                                                color: n[900],
                                                letterSpacing: headingLetterSpacing,
                                                textTransform: headingTextTransform,
                                                marginBottom: 4,
                                            }}
                                        >
                                            With Actions
                                        </div>
                                        <div style={{ fontSize: ts.small, color: n[600], lineHeight: 1.5 }}>Card with footer actions.</div>
                                    </div>
                                    <div
                                        style={{
                                            padding: '8px 16px',
                                            borderTop: border,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: 6,
                                        }}
                                    >
                                        <button className="preview-link"
                                            style={{
                                                padding: '4px 6px',
                                                fontSize: ts.small,
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
                                                padding: '4px 12px',
                                                fontSize: ts.small,
                                                fontFamily: bodyFont,
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: radius,
                                                textTransform: buttonTextTransform,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={labelStyle}>Form Fields</div>
                            <div style={{ background: '#fff', border, borderRadius: radius, padding: 20, maxWidth: 360 }}>
                                <div style={{ marginBottom: 12 }}>
                                    <label
                                        style={{ display: 'block', fontSize: ts.small, fontWeight: 600, color: n[700], marginBottom: 4 }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="jane@example.com"
                                        readOnly
                                        style={{
                                            width: '100%',
                                            padding: '8px 10px',
                                            fontSize: ts.secondary,
                                            fontFamily: bodyFont,
                                            color: n[800],
                                            background: '#fff',
                                            border,
                                            borderRadius: radius,
                                            outline: 'none',
                                        }}
                                    />
                                    <div style={{ fontSize: ts.small - 1, color: n[400], marginTop: 3 }}>We'll never share your email.</div>
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <label
                                        style={{ display: 'block', fontSize: ts.small, fontWeight: 600, color: n[700], marginBottom: 4 }}
                                    >
                                        Category
                                    </label>
                                    <select
                                        style={{
                                            width: '100%',
                                            padding: '8px 10px',
                                            fontSize: ts.secondary,
                                            fontFamily: bodyFont,
                                            color: n[800],
                                            background: '#fff',
                                            border,
                                            borderRadius: radius,
                                            outline: 'none',
                                        }}
                                    >
                                        <option>Select an option…</option>
                                    </select>
                                </div>
                                <button
                                    className="preview-btn preview-btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '9px 18px',
                                        fontSize: ts.secondary,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: radius,
                                        textTransform: buttonTextTransform,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        {/* Badges & Alerts */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                            <div>
                                <div style={labelStyle}>Badges</div>
                                <div
                                    style={{
                                        background: '#fff',
                                        border,
                                        borderRadius: radius,
                                        padding: 16,
                                        display: 'flex',
                                        gap: 6,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: '2px 10px',
                                            fontSize: ts.small,
                                            fontWeight: 600,
                                            borderRadius: 9999,
                                            background: '#f0fdf4',
                                            color: '#166534',
                                        }}
                                    >
                                        Success
                                    </span>
                                    <span
                                        style={{
                                            padding: '2px 10px',
                                            fontSize: ts.small,
                                            fontWeight: 600,
                                            borderRadius: 9999,
                                            background: '#fffbeb',
                                            color: '#92400e',
                                        }}
                                    >
                                        Warning
                                    </span>
                                    <span
                                        style={{
                                            padding: '2px 10px',
                                            fontSize: ts.small,
                                            fontWeight: 600,
                                            borderRadius: 9999,
                                            background: '#fef2f2',
                                            color: '#991b1b',
                                        }}
                                    >
                                        Danger
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div style={labelStyle}>Alerts</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <div
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: radius,
                                            fontSize: ts.small,
                                            borderLeft: '4px solid #22c55e',
                                            background: '#f0fdf4',
                                            color: '#166534',
                                        }}
                                    >
                                        <strong>Success</strong> — Changes saved.
                                    </div>
                                    <div
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: radius,
                                            fontSize: ts.small,
                                            borderLeft: '4px solid #f59e0b',
                                            background: '#fffbeb',
                                            color: '#92400e',
                                        }}
                                    >
                                        <strong>Warning</strong> — Trial expiring.
                                    </div>
                                    <div
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: radius,
                                            fontSize: ts.small,
                                            borderLeft: '4px solid #ef4444',
                                            background: '#fef2f2',
                                            color: '#991b1b',
                                        }}
                                    >
                                        <strong>Error</strong> — Something broke.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div>
                            <div style={labelStyle}>Table</div>
                            <div style={{ background: '#fff', border, borderRadius: radius, overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: ts.secondary }}>
                                    <thead>
                                        <tr>
                                            {['Name', 'Role', 'Status'].map((th) => (
                                                <th
                                                    key={th}
                                                    style={{
                                                        textAlign: 'left',
                                                        padding: '8px 14px',
                                                        fontSize: ts.small - 1,
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        color: n[500],
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
                                        {(
                                            [
                                                ['Alice Chen', 'Engineer', 'Success'],
                                                ['Bob Rivera', 'Designer', 'Warning'],
                                                ['Cara Okafor', 'PM', 'Danger'],
                                            ] as const
                                        ).map(([name, role, status], i) => (
                                            <tr key={i}>
                                                <td
                                                    style={{
                                                        padding: '10px 14px',
                                                        fontWeight: 500,
                                                        color: n[900],
                                                        borderBottom: i < 2 ? `1px solid ${n[100]}` : 'none',
                                                    }}
                                                >
                                                    {name}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '10px 14px',
                                                        color: n[700],
                                                        borderBottom: i < 2 ? `1px solid ${n[100]}` : 'none',
                                                    }}
                                                >
                                                    {role}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '10px 14px',
                                                        borderBottom: i < 2 ? `1px solid ${n[100]}` : 'none',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            padding: '2px 10px',
                                                            fontSize: ts.small - 1,
                                                            fontWeight: 600,
                                                            borderRadius: 9999,
                                                            background:
                                                                status === 'Success'
                                                                    ? '#f0fdf4'
                                                                    : status === 'Warning'
                                                                      ? '#fffbeb'
                                                                      : '#fef2f2',
                                                            color:
                                                                status === 'Success'
                                                                    ? '#166534'
                                                                    : status === 'Warning'
                                                                      ? '#92400e'
                                                                      : '#991b1b',
                                                        }}
                                                    >
                                                        {status === 'Success'
                                                            ? 'Active'
                                                            : status === 'Warning'
                                                              ? 'Review'
                                                              : 'Inactive'}
                                                    </span>
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
