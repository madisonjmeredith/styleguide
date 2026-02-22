import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
    className?: string;
};

function NeoAccordion({ title, defaultOpen = false, children, className }: Props) {
    const [open, setOpen] = React.useState(defaultOpen);

    return (
        <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen} className={cn('py-4', className)}>
            <CollapsiblePrimitive.Trigger className="flex w-full cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-left">
                <ChevronRight
                    className={cn('size-4 shrink-0 text-neo transition-transform duration-200', open && 'rotate-90')}
                />
                <span className="text-sm font-bold text-gray-900">{title}</span>
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                <div className="pt-3">{children}</div>
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    );
}

export { NeoAccordion };
