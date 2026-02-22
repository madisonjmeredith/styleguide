import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { neo } from './neo-utils';

const neoButtonVariants = cva(
    cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold',
        neo.border,
        neo.radius,
        neo.shadow,
        neo.hover,
        neo.active,
        neo.focus,
        neo.transition,
        'cursor-pointer disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
    ),
    {
        variants: {
            variant: {
                default: 'bg-slate-500 text-white',
                secondary: 'bg-white text-slate-700',
                destructive: 'bg-red-600 text-white border-red-800',
                ghost: 'border-transparent shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-neo-light',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-10 px-6',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function NeoButton({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof neoButtonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return <Comp className={cn(neoButtonVariants({ variant, size, className }))} {...props} />;
}

export { NeoButton, neoButtonVariants };
