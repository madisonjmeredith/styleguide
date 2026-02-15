export type NeutralFamily = 'cool' | 'neutral' | 'warm';
export type IconLibrary = 'fontawesome' | 'fontawesome-outline' | 'heroicons' | 'feather' | 'lucide';
export type TypeScale = 'small' | 'regular' | 'large' | 'extra-large';

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
};

export type StyleGuideData = {
    id: number;
    name: string;
    configuration: StyleGuideConfig;
    updated_at: string;
};
