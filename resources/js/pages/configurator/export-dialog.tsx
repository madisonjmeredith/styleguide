import { useState } from 'react';
import { NeoButton } from '@/components/neo/neo-button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import { neo } from '@/components/neo/neo-utils';
import type { StyleGuideConfig } from '@/types';
import { Check, ClipboardCopy, Download, FileCode, FileText } from 'lucide-react';
import { generateClaudeMd } from './lib/generate-claude-md';
import { generateHTML } from './lib/generate-html';
import { downloadFile } from './lib/download-file';

type Props = {
    config: StyleGuideConfig;
    trigger?: React.ReactNode;
};

export function ExportDialog({ config, trigger }: Props) {
    const [activeTab, setActiveTab] = useState<'html' | 'claude'>('html');
    const [copiedText, copy] = useClipboard();
    const [htmlDownloaded, setHtmlDownloaded] = useState(false);

    const handleHtmlExport = () => {
        downloadFile(generateHTML(config), 'style-guide.html', 'text/html');
        setHtmlDownloaded(true);
        setTimeout(() => setHtmlDownloaded(false), 2000);
    };

    const handleClaudeCopy = async () => {
        await copy(generateClaudeMd(config));
    };

    const handleClaudeDownload = () => {
        downloadFile(generateClaudeMd(config), 'STYLE_GUIDE.md', 'text/markdown');
    };

    const isCopied = copiedText !== null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger ?? (
                    <NeoButton className="w-full">Export Style Guide</NeoButton>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Export Style Guide</DialogTitle>
                    <DialogDescription>Download your style guide as HTML or get Claude Code instructions.</DialogDescription>
                </DialogHeader>

                <div className={cn('mb-4 flex gap-0.5 border-2 border-neo p-0.5', neo.radius)}>
                    <button
                        onClick={() => setActiveTab('html')}
                        className={cn(
                            'flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-none py-2 px-3 text-sm font-semibold transition-colors',
                            neo.radius,
                            activeTab === 'html' ? 'bg-neo text-white' : 'bg-transparent text-gray-500 hover:text-neo',
                        )}
                    >
                        <FileCode className="size-4" />
                        HTML File
                    </button>
                    <button
                        onClick={() => setActiveTab('claude')}
                        className={cn(
                            'flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-none py-2 px-3 text-sm font-semibold transition-colors',
                            neo.radius,
                            activeTab === 'claude' ? 'bg-neo text-white' : 'bg-transparent text-gray-500 hover:text-neo',
                        )}
                    >
                        <FileText className="size-4" />
                        Claude Code
                    </button>
                </div>

                {activeTab === 'html' && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Downloads a self-contained HTML file with your design tokens, color palettes, typography specimens, and
                            component examples. Open it in a browser as a visual reference.
                        </p>
                        <NeoButton onClick={handleHtmlExport} className="w-full" size="lg">
                            {htmlDownloaded ? (
                                <>
                                    <Check className="size-4" />
                                    Downloaded!
                                </>
                            ) : (
                                <>
                                    <Download className="size-4" />
                                    Download style-guide.html
                                </>
                            )}
                        </NeoButton>
                    </div>
                )}

                {activeTab === 'claude' && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Generates a markdown description of your design system. Paste it into your project's{' '}
                            <code className="rounded bg-muted px-1 py-0.5 text-xs">CLAUDE.md</code> file or download as a standalone
                            reference.
                        </p>
                        <div className="flex gap-2">
                            <NeoButton onClick={handleClaudeCopy} variant="secondary" className="flex-1">
                                {isCopied ? (
                                    <>
                                        <Check className="size-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <ClipboardCopy className="size-4" />
                                        Copy to Clipboard
                                    </>
                                )}
                            </NeoButton>
                            <NeoButton onClick={handleClaudeDownload} className="flex-1">
                                <Download className="size-4" />
                                Download .md
                            </NeoButton>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
