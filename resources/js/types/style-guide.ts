export type NeutralFamily = 'cool' | 'neutral' | 'warm';
export type IconLibrary = 'fontawesome' | 'heroicons' | 'feather';

export type FontMeta = { category: string; weights: string };

export type StyleGuideConfig = {
    primaryColor: string;
    secondaryColor: string;
    neutralFamily: NeutralFamily;
    headingFont: string;
    headingFontMeta?: FontMeta;
    bodyFont: string;
    bodyFontMeta?: FontMeta;
    iconLibrary: IconLibrary;
    borderEnabled: boolean;
    shadowEnabled: boolean;
    radius: number;
};

export type StyleGuideData = {
    id: number;
    name: string;
    configuration: StyleGuideConfig;
    updated_at: string;
};
