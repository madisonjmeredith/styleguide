export type NeutralFamily = 'cool' | 'neutral' | 'warm';
export type IconLibrary = 'fontawesome' | 'heroicons' | 'feather';

export type StyleGuideConfig = {
    primaryColor: string;
    secondaryColor: string;
    neutralFamily: NeutralFamily;
    headingFont: string;
    bodyFont: string;
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
