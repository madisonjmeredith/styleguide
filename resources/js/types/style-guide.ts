export type NeutralFamily = 'cool' | 'neutral' | 'warm';
export type IconLibrary = 'fontawesome-regular' | 'fontawesome-solid' | 'heroicons' | 'lucide' | 'material-symbols';
export type TypeScale = 'small' | 'regular' | 'large' | 'extra-large';
export type LinkColor = 'primary' | 'secondary';
export type LinkHoverColor = 'darker' | 'lighter' | 'none';
export type LinkUnderlineOnHover = 'show' | 'remove' | 'none';
export type ButtonHoverStyle = 'darker' | 'lighter' | 'glow' | 'lift';

export type FontMeta = { category: string; weights: string };

export type StyleGuideConfig = {
    primaryColor: string;
    secondaryColor: string;
    neutralFamily: NeutralFamily;
    headingFont: string;
    headingFontMeta?: FontMeta;
    bodyFont: string;
    bodyFontMeta?: FontMeta;
    typeScale: TypeScale;
    iconLibrary: IconLibrary;
    borderWidth: number;
    shadowEnabled: boolean;
    radius: number;
    linkColor: LinkColor;
    linkHoverColor: LinkHoverColor;
    linkUnderline: boolean;
    linkUnderlineOnHover: LinkUnderlineOnHover;
    buttonHoverStyle: ButtonHoverStyle;
};

export type StyleGuideData = {
    id: number;
    name: string;
    configuration: StyleGuideConfig;
    updated_at: string;
};
