import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { BreadcrumbItem, StyleGuideData } from '@/types';
import { dashboard, home } from '@/routes';
import { show as guidesShow } from '@/routes/guides';
import { generateHTML } from './configurator/lib/generate-html';
import { generateClaudeMd } from './configurator/lib/generate-claude-md';
import { downloadFile } from './configurator/lib/download-file';
import { useClipboard } from '@/hooks/use-clipboard';
import { ClipboardCopy, EllipsisVertical, FileCode, FileText, Palette, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Props = {
    styleGuides: StyleGuideData[];
};

export default function Dashboard({ styleGuides }: Props) {
    const [deleteGuide, setDeleteGuide] = useState<StyleGuideData | null>(null);
    const [copiedText, copy] = useClipboard();

    const handleDelete = () => {
        if (!deleteGuide) {
            return;
        }

        router.delete(`/configurator/${deleteGuide.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteGuide(null),
        });
    };

    const handleExportHtml = (guide: StyleGuideData) => {
        const filename = `${guide.name.toLowerCase().replace(/\s+/g, '-')}.html`;
        downloadFile(generateHTML(guide.configuration), filename, 'text/html');
    };

    const handleExportMarkdown = (guide: StyleGuideData) => {
        const filename = `${guide.name.toLowerCase().replace(/\s+/g, '-')}.md`;
        downloadFile(generateClaudeMd(guide.configuration), filename, 'text/markdown');
    };

    const handleCopyMarkdown = async (guide: StyleGuideData) => {
        await copy(generateClaudeMd(guide.configuration));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const isCopied = copiedText !== null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-foreground">My Style Guides</h1>
                        <p className="text-sm text-muted-foreground">
                            View, export, and manage your saved style guides.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={home()}>
                            <Plus className="size-4" />
                            New Style Guide
                        </Link>
                    </Button>
                </div>

                {styleGuides.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-sidebar-border/70 p-12 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                            <Palette className="size-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-foreground">No style guides yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Get started by creating a new style guide in the configurator.
                        </p>
                        <Button asChild className="mt-4">
                            <Link href={home()}>
                                <Plus className="size-4" />
                                Create Style Guide
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {styleGuides.map((guide) => (
                            <div
                                key={guide.id}
                                className="group relative flex flex-col rounded-xl border border-sidebar-border/70 bg-card transition-shadow hover:shadow-md"
                            >
                                {/* Color preview strip */}
                                <div className="flex h-3 overflow-hidden rounded-t-xl">
                                    <div className="flex-1" style={{ backgroundColor: guide.configuration.primaryColor }} />
                                    <div className="flex-1" style={{ backgroundColor: guide.configuration.secondaryColor }} />
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-semibold text-foreground">
                                                {guide.name}
                                            </h3>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                Updated {formatDate(guide.updated_at)}
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer border-none bg-transparent p-0">
                                                    <EllipsisVertical className="size-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => handleExportHtml(guide)}>
                                                    <FileCode className="size-4" />
                                                    Export as HTML
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleExportMarkdown(guide)}>
                                                    <FileText className="size-4" />
                                                    Download as Markdown
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleCopyMarkdown(guide)}>
                                                    <ClipboardCopy className="size-4" />
                                                    {isCopied ? 'Copied!' : 'Copy Markdown'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive" onSelect={() => setDeleteGuide(guide)}>
                                                    <Trash2 className="size-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Config summary */}
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                            {guide.configuration.headingFont}
                                        </span>
                                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                            {guide.configuration.bodyFont}
                                        </span>
                                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground capitalize">
                                            {guide.configuration.iconLibrary.replace(/-/g, ' ')}
                                        </span>
                                    </div>

                                    {/* Open in configurator link */}
                                    <div className="mt-4 pt-3 border-t border-sidebar-border/70">
                                        <Button asChild variant="outline" size="sm" className="w-full">
                                            <Link href={guidesShow(guide.id)}>
                                                <Palette className="size-3.5" />
                                                Open in Configurator
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={deleteGuide !== null} onOpenChange={(open) => !open && setDeleteGuide(null)}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Style Guide</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deleteGuide?.name}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteGuide(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
