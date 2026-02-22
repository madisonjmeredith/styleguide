import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, LayoutGrid, LogIn, LogOut, Menu, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:px-6">
            {/* Mobile hamburger */}
            <button
                type="button"
                onClick={onOpenSidebar}
                className="-m-2.5 p-2.5 text-gray-500 hover:text-gray-900 lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Menu aria-hidden="true" className="size-6" />
            </button>

            {/* Divider (mobile only) */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            {/* Spacer */}
            <div className="flex flex-1 items-center justify-end gap-x-3">
                {user && !isEditing && (
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-md bg-gray-900 px-3.5 py-2 text-sm font-semibold text-white border-none cursor-pointer transition-colors hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save Style Guide'}
                    </button>
                )}

                <button
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
                    className="rounded-md bg-green-600 px-3.5 py-2 text-sm font-semibold text-white border-none cursor-pointer transition-colors hover:bg-green-500"
                >
                    Export Style Guide
                </button>

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1.5 rounded-full p-1 bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors">
                                <Avatar className="size-8 overflow-hidden rounded-full">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64" align="end">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserInfo user={user} showEmail={true} />
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link className="block w-full cursor-pointer" href={dashboard.url()} prefetch>
                                    <LayoutGrid className="mr-2" />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link
                                    className="block w-full cursor-pointer"
                                    href={logout()}
                                    as="button"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2" />
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors p-0">
                                My Account
                                <ChevronDown className="size-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuItem asChild>
                                <Link className="block w-full cursor-pointer" href={register.url()}>
                                    <UserPlus className="mr-2" />
                                    Register
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link className="block w-full cursor-pointer" href={login.url()}>
                                    <LogIn className="mr-2" />
                                    Login
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}
