export type NeutralFamily = 'cool' | 'neutral' | 'warm';
export type IconLibrary = 'fontawesome-regular' | 'fontawesome-solid' | 'heroicons' | 'lucide' | 'material-symbols';
export type TypeScale = 'small' | 'regular' | 'large' | 'extra-large';
export type LinkColor = 'primary' | 'secondary';
export type LinkHoverColor = 'darker' | 'lighter' | 'none';
export type LinkUnderlineOnHover = 'show' | 'remove' | 'none';
export type ButtonStyle = 'filled' | 'outline';
export type ButtonHoverStyle = 'fill' | 'darker' | 'lighter' | 'glow' | 'lift';
export type TransitionDuration = number;
export type HeadingLetterSpacing = 'tight' | 'normal' | 'wide';
export type BodyLineHeight = 'compact' | 'comfortable' | 'spacious';
export type TextTransform = 'none' | 'uppercase';

export type FontMeta = { category: string; weights: string };

export type StyleGuideConfig = {
    name: string;
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
    headingFontWeight: number;
    bodyFontWeight: number;
    headingLetterSpacing: HeadingLetterSpacing;
    bodyLineHeight: BodyLineHeight;
    buttonStyle: ButtonStyle;
    buttonTextTransform: TextTransform;
    headingTextTransform: TextTransform;
    buttonHoverStyle: ButtonHoverStyle;
    transitionDuration: TransitionDuration;
    transitionEasing?: string;
};

export type StyleGuideData = {
    id: number;
    name: string;
    configuration: StyleGuideConfig;
    updated_at: string;
};
