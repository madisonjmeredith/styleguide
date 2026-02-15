import type { StyleGuideConfig } from '@/types';
import { NEUTRAL_PRESETS, tint } from './data';

type Props = {
    config: StyleGuideConfig;
};

export function PreviewPane({ config }: Props) {
    const n = NEUTRAL_PRESETS[config.neutralFamily].values;
    const border = config.borderEnabled ? `1px solid ${n[200]}` : 'none';
    const radius = config.radius;
    const shadow = config.shadowEnabled ? '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05)' : 'none';
    const headingFont = `'${config.headingFont}', Georgia, serif`;
    const bodyFont = `'${config.bodyFont}', system-ui, sans-serif`;
    const primary = config.primaryColor;
    const secondary = config.secondaryColor;

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
            <div className="py-2.5 px-5 bg-white border-b border-neutral-200 flex items-center justify-between shrink-0">
                <div className="text-xs font-semibold text-neutral-700">Live Preview</div>
                <div className="text-[11px] text-neutral-400">Updates in real time</div>
            </div>
            <div className="flex-1 overflow-auto p-5">
                <div className="max-w-[800px] mx-auto bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
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
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: n[900],
                                        lineHeight: 1.2,
                                        marginBottom: 4,
                                    }}
                                >
                                    Heading One
                                </h1>
                                <h2
                                    style={{
                                        fontFamily: headingFont,
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: n[900],
                                        lineHeight: 1.25,
                                        marginBottom: 4,
                                    }}
                                >
                                    Heading Two
                                </h2>
                                <h3
                                    style={{
                                        fontFamily: headingFont,
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: n[900],
                                        lineHeight: 1.3,
                                        marginBottom: 12,
                                    }}
                                >
                                    Heading Three
                                </h3>
                                <p style={{ fontSize: 14, color: n[700], lineHeight: 1.65, marginBottom: 8 }}>
                                    This is body text using the selected body font. It demonstrates comfortable reading size, generous line
                                    height, and softened color.
                                </p>
                                <p style={{ fontSize: 13, color: n[500], lineHeight: 1.5, marginBottom: 8 }}>
                                    This is secondary text — smaller and lighter for captions and metadata.
                                </p>
                                <p style={{ fontSize: 14, color: n[700] }}>
                                    Links look{' '}
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        style={{ color: primary, textDecoration: 'underline', textUnderlineOffset: 2 }}
                                    >
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
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: primary,
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: radius,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Primary
                                </button>
                                <button
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: secondary,
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: radius,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Secondary
                                </button>
                                <button
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: 'transparent',
                                        color: n[700],
                                        border,
                                        borderRadius: radius,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Outline
                                </button>
                                <button
                                    style={{
                                        padding: '9px 8px',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: 'transparent',
                                        color: primary,
                                        border: 'none',
                                        borderRadius: radius,
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: 2,
                                    }}
                                >
                                    Text link
                                </button>
                                <button
                                    style={{
                                        padding: '9px 18px',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: n[200],
                                        color: n[400],
                                        border: 'none',
                                        borderRadius: radius,
                                        cursor: 'not-allowed',
                                    }}
                                >
                                    Disabled
                                </button>
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
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: n[900],
                                                marginBottom: 4,
                                            }}
                                        >
                                            Basic Card
                                        </div>
                                        <div style={{ fontSize: 12, color: n[600], lineHeight: 1.5 }}>
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
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: n[900],
                                                marginBottom: 4,
                                            }}
                                        >
                                            With Image
                                        </div>
                                        <div style={{ fontSize: 12, color: n[600], lineHeight: 1.5 }}>
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
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: n[900],
                                                marginBottom: 4,
                                            }}
                                        >
                                            With Actions
                                        </div>
                                        <div style={{ fontSize: 12, color: n[600], lineHeight: 1.5 }}>Card with footer actions.</div>
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
                                        <button
                                            style={{
                                                padding: '4px 6px',
                                                fontSize: 11,
                                                fontFamily: bodyFont,
                                                background: 'transparent',
                                                color: primary,
                                                border: 'none',
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                                textUnderlineOffset: 2,
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            style={{
                                                padding: '4px 12px',
                                                fontSize: 11,
                                                fontFamily: bodyFont,
                                                background: primary,
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: radius,
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
                                        style={{ display: 'block', fontSize: 12, fontWeight: 600, color: n[700], marginBottom: 4 }}
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
                                            fontSize: 13,
                                            fontFamily: bodyFont,
                                            color: n[800],
                                            background: '#fff',
                                            border,
                                            borderRadius: radius,
                                            outline: 'none',
                                        }}
                                    />
                                    <div style={{ fontSize: 11, color: n[400], marginTop: 3 }}>We'll never share your email.</div>
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <label
                                        style={{ display: 'block', fontSize: 12, fontWeight: 600, color: n[700], marginBottom: 4 }}
                                    >
                                        Category
                                    </label>
                                    <select
                                        style={{
                                            width: '100%',
                                            padding: '8px 10px',
                                            fontSize: 13,
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
                                    style={{
                                        width: '100%',
                                        padding: '9px 18px',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: bodyFont,
                                        background: primary,
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: radius,
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
                                            fontSize: 12,
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
                                            fontSize: 12,
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
                                            fontSize: 12,
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
                                            fontSize: 12,
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
                                            fontSize: 12,
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
                                            fontSize: 12,
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
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                    <thead>
                                        <tr>
                                            {['Name', 'Role', 'Status'].map((th) => (
                                                <th
                                                    key={th}
                                                    style={{
                                                        textAlign: 'left',
                                                        padding: '8px 14px',
                                                        fontSize: 11,
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
                                                            fontSize: 11,
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
