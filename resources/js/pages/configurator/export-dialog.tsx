import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useClipboard } from '@/hooks/use-clipboard';
import type { StyleGuideConfig } from '@/types';
import { Check, ClipboardCopy, Download, FileCode, FileText } from 'lucide-react';
import { generateClaudeMd } from './lib/generate-claude-md';
import { generateHTML } from './lib/generate-html';
import { downloadFile } from './lib/download-file';

type Props = {
    config: StyleGuideConfig;
};

export function ExportDialog({ config }: Props) {
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
                <button className="w-full py-2.5 text-sm/6 font-semibold bg-green-600 hover:bg-green-500 text-white border-none rounded-md cursor-pointer transition-all duration-200">
                    Export Style Guide
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Export Style Guide</DialogTitle>
                    <DialogDescription>Download your style guide as HTML or get Claude Code instructions.</DialogDescription>
                </DialogHeader>

                <div className="flex gap-1 p-1 bg-muted rounded-lg mb-4">
                    <button
                        onClick={() => setActiveTab('html')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-md transition-colors cursor-pointer border-none ${
                            activeTab === 'html' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground bg-transparent'
                        }`}
                    >
                        <FileCode className="size-4" />
                        HTML File
                    </button>
                    <button
                        onClick={() => setActiveTab('claude')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-md transition-colors cursor-pointer border-none ${
                            activeTab === 'claude' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground bg-transparent'
                        }`}
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
                        <Button onClick={handleHtmlExport} className="w-full" size="lg">
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
                        </Button>
                    </div>
                )}

                {activeTab === 'claude' && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Generates a markdown description of your design system. Paste it into your project's{' '}
                            <code className="bg-muted px-1 py-0.5 rounded text-xs">CLAUDE.md</code> file or download as a standalone
                            reference.
                        </p>
                        <div className="flex gap-2">
                            <Button onClick={handleClaudeCopy} variant="outline" className="flex-1">
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
                            </Button>
                            <Button onClick={handleClaudeDownload} className="flex-1">
                                <Download className="size-4" />
                                Download .md
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
