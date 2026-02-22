import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, LayoutGrid, LogIn, LogOut, Menu, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLogoIcon from '@/components/app-logo-icon';
import { NeoButton } from '@/components/neo/neo-button';
import { NeoDropdown, NeoDropdownContent, NeoDropdownItem, NeoDropdownSeparator, NeoDropdownTrigger } from '@/components/neo/neo-dropdown';
import { UserInfo } from '@/components/user-info';
import { useInitials } from '@/hooks/use-initials';
import type { StyleGuideConfig, User } from '@/types';
import { dashboard, login, logout, register } from '@/routes';
import { downloadZip } from './lib/download-file';
import { generateClaudeMd } from './lib/generate-claude-md';
import { generateHTML } from './lib/generate-html';
import { generateReadme } from './lib/generate-readme';

type Props = {
    config: StyleGuideConfig;
    user: User | null;
    isEditing: boolean;
    onOpenSidebar: () => void;
};

export function PreviewHeader({ config, user, isEditing, onOpenSidebar }: Props) {
    const getInitials = useInitials();
    const [saving, setSaving] = useState(false);

    const handleLogout = () => {
        router.flushAll();
    };

    const handleSave = () => {
        setSaving(true);
        router.post(
            '/configurator',
            { name: config.name || null, configuration: config },
            {
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b-2 border-neo bg-white px-4 sm:px-6">
            {/* Mobile hamburger */}
            <button
                type="button"
                onClick={onOpenSidebar}
                className="-m-2.5 cursor-pointer border-none bg-transparent p-2.5 text-gray-500 hover:text-gray-900 lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Menu aria-hidden="true" className="size-6" />
            </button>

            {/* Divider (mobile only) */}
            <div className="h-6 w-px bg-neo/20 lg:hidden" aria-hidden="true" />

            {/* Logo + App Name */}
            <Link href="/" className="flex items-center gap-2 no-underline">
                <AppLogoIcon className="size-6 fill-current text-slate-800" />
                <span className="text-base font-bold tracking-wide text-slate-800">AI Style Guide</span>
            </Link>

            {/* Spacer */}
            <div className="flex flex-1 items-center justify-end gap-x-3">
                {user && !isEditing && (
                    <NeoButton onClick={handleSave} disabled={saving} variant="secondary">
                        {saving ? 'Saving...' : 'Save Style Guide'}
                    </NeoButton>
                )}

                <NeoButton
                    onClick={() => {
                        downloadZip(
                            [
                                { name: 'style-guide.html', content: generateHTML(config) },
                                { name: 'STYLE_GUIDE.md', content: generateClaudeMd(config) },
                                { name: 'README.md', content: generateReadme() },
                            ],
                            'style-guide.zip',
                        );
                    }}
                >
                    Export Style Guide
                </NeoButton>

                {user ? (
                    <NeoDropdown>
                        <NeoDropdownTrigger asChild>
                            <button className="flex cursor-pointer items-center gap-1.5 rounded-full border-none bg-transparent p-1 transition-colors hover:bg-gray-100">
                                <Avatar className="size-8 overflow-hidden rounded-full">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </NeoDropdownTrigger>
                        <NeoDropdownContent className="w-64" align="end">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserInfo user={user} showEmail={true} />
                            </div>
                            <NeoDropdownSeparator />
                            <NeoDropdownItem asChild>
                                <Link className="block w-full cursor-pointer" href={dashboard.url()} prefetch>
                                    <LayoutGrid className="mr-2" />
                                    Dashboard
                                </Link>
                            </NeoDropdownItem>
                            <NeoDropdownSeparator />
                            <NeoDropdownItem asChild>
                                <Link
                                    className="block w-full cursor-pointer"
                                    href={logout()}
                                    as="button"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2" />
                                    Log out
                                </Link>
                            </NeoDropdownItem>
                        </NeoDropdownContent>
                    </NeoDropdown>
                ) : (
                    <NeoDropdown>
                        <NeoDropdownTrigger asChild>
                            <button className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-sm font-bold text-gray-600 transition-colors hover:text-gray-900">
                                My Account
                                <ChevronDown className="size-4" />
                            </button>
                        </NeoDropdownTrigger>
                        <NeoDropdownContent className="w-56" align="end">
                            <NeoDropdownItem asChild>
                                <Link className="block w-full cursor-pointer" href={register.url()}>
                                    <UserPlus className="mr-2" />
                                    Register
                                </Link>
                            </NeoDropdownItem>
                            <NeoDropdownItem asChild>
                                <Link className="block w-full cursor-pointer" href={login.url()}>
                                    <LogIn className="mr-2" />
                                    Login
                                </Link>
                            </NeoDropdownItem>
                        </NeoDropdownContent>
                    </NeoDropdown>
                )}
            </div>
        </div>
    );
}
